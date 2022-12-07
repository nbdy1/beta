import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Animated,
  BackHandler,
  Alert,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import data from "../data/StageData";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import AwesomeButton from "react-native-really-awesome-button-fixed";
import Modal from "react-native-modal";
import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useCallback } from "react";
import { firebase } from "../../firebaseConfig";
import { reject, update } from "lodash";

// TODO: Change the buttons to use flatlist and rendered with map function. Don't use scrollview for list with many children.

const StageScreen = ({ route, navigation }) => {
  const debounce = require("lodash.debounce");
  const [sound, setSound] = useState("");

  async function playCorrect() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sfx/correct.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function playWrong() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sfx/wrong.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const updateBetacoins = () =>
    new Promise(async (res, rej) => {
      try {
        await docRef
          .update({
            "currency.betacoins": firebase.firestore.FieldValue.increment(10),
          })
          .then(() => navigation.goBack());
        res();
      } catch (e) {
        reject(e);
        console.log(e);
      }
    });

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Keluar dari level",
        "Apakah Anda yakin ingin kembali? (progres level tidak akan disimpan)",
        [
          {
            text: "Tidak",
            onPress: () => null,
            style: "cancel",
          },
          { text: "Ya", onPress: () => navigation.goBack() },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const docRef = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid);

  const corResArray = [
    " Benar!",
    " Benar!",
    " Anak Pinter",
    " Mantaappp",
    " Benar!",
    " Anak Pinter",
    " 👏👏👏",
  ];
  const wrongResArray = [
    " Salah",
    " Lain kali",
    " Salah",
    " Perlu belajar lagi",
    " Salah",
    " Salah Pencet?",
    " 😔",
    " Salah",
  ];

  const corRes = corResArray[Math.floor(Math.random() * corResArray.length)];
  const wrongRes =
    wrongResArray[Math.floor(Math.random() * corResArray.length)];

  const { level } = route.params;

  const allQuestions = data[level - 1];
  // reducer finds and sums the amount of 'new' questions we have and sums it. So we can get the total points only questions by subtracting it from the length.
  const pointQuestionsTotal =
    allQuestions.length -
    allQuestions.reduce(
      (total, question) => (question?.type === "new" ? total + 1 : total),
      0
    );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [text, setText] = useState("");
  // const [manyText, setManyText] = useState({
  //   0: "",
  //   1: "",
  //   2: "",
  //   3: "",
  //   4: "",
  //   5: "",
  // });
  const [blank1, setBlank1] = useState("");
  const [blank2, setBlank2] = useState("");
  const [blank3, setBlank3] = useState("");
  const [blank4, setBlank4] = useState("");

  const [questionType, setQuestionType] = useState(
    allQuestions[currentQuestionIndex]?.type
  );

  const validateAnswer = (selectedOption) => {
    if (questionType == "choice") {
      let correct_option = allQuestions[currentQuestionIndex]["correct_option"];
      setCurrentOptionSelected(selectedOption);
      setCorrectOption(correct_option);

      if (selectedOption == correct_option) {
        playCorrect();
        setIsAnswerCorrect(true);
        setScore((prev) => prev + 1);

        // Set Score
      } else if (selectedOption != correct_option) {
        playWrong();
        setIsAnswerCorrect(false);
      }
    } else if (questionType == "input") {
      let correct_answer = allQuestions[currentQuestionIndex]["correct_answer"];
      const loweredAnswer = text.toLowerCase().trim();
      console.log(`correct_answer: ${correct_answer}`);
      console.log(`loweredAnswer: ${correct_answer}`);

      if (
        loweredAnswer == correct_answer ||
        correct_answer.includes(loweredAnswer)
      ) {
        playCorrect();
        setIsAnswerCorrect(true);
        setScore((prev) => prev + 1);
      } else if (loweredAnswer != correct_answer) {
        playWrong();
        setIsAnswerCorrect(false);
      }
    } else if (questionType == "fillBlank") {
      let correct_answer = allQuestions[currentQuestionIndex]["answers"];

      const loweredBlanks = selectedOption.map((element) => {
        return element.toLowerCase().trim();
      });

      let result = null;

      for (let i = 0; i < correct_answer.length; i++) {
        if (
          loweredBlanks[i] == correct_answer[i] ||
          correct_answer[i].includes(loweredBlanks[i])
        ) {
          console.log(`${i} matches`);
        } else {
          result = false;
        }
      }
      if (result === false) {
        result = false;
      } else result = true;
      console.log(`correct_answer: ${correct_answer}`);
      console.log(`loweredBlanks: ${correct_answer}`);

      if (result === true) {
        playCorrect();
        setIsAnswerCorrect(true);
        setScore((prev) => prev + 1);
      } else if (result === false) {
        playWrong();
        setIsAnswerCorrect(false);
      }
    }
    // Show Next Button
  };

  const validateAnswerDebouncer = useCallback(
    debounce((e) => validateAnswer(), 2000),
    []
  );

  const checkAndModal = (payload) => {
    validateAnswer(payload);
    openModal();
  };

  const openModal = () => {
    setIsOptionsDisabled(true);
    setShowResponseModal(true);
  };

  const closeModal = () => {
    setShowResponseModal(false);
    setIsOptionsDisabled(false);
  };

  const renderQuestion = () => {
    if (questionType == "fillBlank") {
      return (
        <View>
          <Text
            style={{ fontFamily: "Anek-B" }}
            className={`${
              isKeyboardVisible ? "mb-3" : "mb-6"
            } mt-6 text-2xl text-black`}
          >
            Isi kata yang kurang dari terjemahan kalimat berikut
          </Text>
          <Text
            style={{ fontFamily: "Anek-B" }}
            className={`${
              isKeyboardVisible ? "mb-1" : "mb-3"
            } text-lg text-blue-500`}
          >
            {allQuestions[currentQuestionIndex]?.from} ⬇️
          </Text>
          <Text style={{ fontFamily: "Anek-B" }} className="text-lg text-black">
            {allQuestions[currentQuestionIndex]?.to}
          </Text>
        </View>
      );
    }
    return (
      <View>
        {/* Question Counter */}
        {/* <View className="flex-row items-end">
          <Text className="text-black text-lg mr-2">
            {currentQuestionIndex + 1} {"/"} {allQuestions.length}
          </Text>
        </View> */}
        {/* Question */}
        <Text
          style={{ fontFamily: "Anek-B" }}
          className={` ${
            questionType == "new"
              ? "mt-8 text-4xl leading-[50px] text-purple-500 mb-6"
              : "mt-6 text-2xl text-black"
          }`}
        >
          {questionType == "new"
            ? "Kosakata Baru!"
            : allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };

  const renderAnswerMethod = () => {
    if (questionType == "choice") {
      // renderoptions
      return (
        <View className="px-2 mt-5 mb-5">
          {allQuestions[currentQuestionIndex]?.options.map((option) => (
            <TouchableOpacity
              // onPress={() => validateAnswer(option)}
              activeOpacity={0.5}
              onPress={() => setCurrentOptionSelected(option)}
              disabled={isOptionsDisabled}
              key={option}
              className={`rounded-lg bg-gray-50 ${
                currentOptionSelected == option ? "bg-yellow-100" : "bg-gray-50"
              } shadow-lg  flex-row justify-center items-center py-5 my-3`}
            >
              <Text
                style={{ fontFamily: "Anek-R" }}
                className="text-xl mt-1 text-black px-5"
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else if (questionType == "input") {
      // renderinputbox
      return (
        <View className="px-2 mt-10 mb-5">
          <TextInput
            style={{ fontFamily: "Anek-R" }}
            borderRadius={10}
            multiline={true}
            placeholder="Apa ya??"
            onChangeText={(e) => setText(e)}
            value={text}
          />
        </View>
      );
    } else if (questionType == "fillBlank") {
      if ((allQuestions[currentQuestionIndex]?.answers).length == 1) {
        return (
          <View
            className={`${
              isKeyboardVisible ? "mt-3" : "mt-10"
            } px-2 mb-5 gap-x-2 flex-row justify-center`}
          >
            <View className="mb-2">
              <TextInput
                className="h-12 pl-2 pt-3 text-xl w-20"
                style={{ fontFamily: "Anek-R" }}
                height={60}
                borderRadius={10}
                multiline={false}
                backgroundColor="lightgray"
                placeholder={"1"}
                value={blank1}
                onChangeText={(text) => setBlank1(text)}
              />
            </View>
          </View>
        );
      } else if ((allQuestions[currentQuestionIndex]?.answers).length == 2) {
        return (
          <View
            className={`${
              isKeyboardVisible ? "mt-3" : "mt-10"
            } px-2 mb-5 gap-x-2 flex-row justify-center`}
          >
            <View className="mb-2">
              <TextInput
                className="h-12 pl-2 pt-3 text-xl w-20"
                style={{ fontFamily: "Anek-R" }}
                height={60}
                borderRadius={10}
                multiline={false}
                backgroundColor="lightgray"
                placeholder={"1"}
                value={blank1}
                onChangeText={(text) => setBlank1(text)}
              />
            </View>
            <View className="mb-2">
              <TextInput
                className="h-12 pl-2 pt-3 text-xl w-20"
                style={{ fontFamily: "Anek-R" }}
                height={60}
                borderRadius={10}
                multiline={false}
                backgroundColor="lightgray"
                placeholder={"2"}
                value={blank2}
                onChangeText={(text) => setBlank2(text)}
              />
            </View>
          </View>
        );
      } else if ((allQuestions[currentQuestionIndex]?.answers).length == 3) {
        return (
          <View
            className={`${
              isKeyboardVisible ? "mt-3" : "mt-10"
            } px-2 mb-5 gap-x-2 flex-row justify-center`}
          >
            <View className="mb-2">
              <TextInput
                className="h-12 pl-2 pt-3 text-xl w-20"
                style={{ fontFamily: "Anek-R" }}
                height={60}
                borderRadius={10}
                multiline={false}
                backgroundColor="lightgray"
                placeholder={"1"}
                value={blank1}
                onChangeText={(text) => setBlank1(text)}
              />
            </View>
            <View className="mb-2">
              <TextInput
                className="h-12 pl-2 pt-3 text-xl w-20"
                style={{ fontFamily: "Anek-R" }}
                height={60}
                borderRadius={10}
                multiline={false}
                backgroundColor="lightgray"
                placeholder={"2"}
                value={blank2}
                onChangeText={(text) => setBlank2(text)}
              />
            </View>
            <View className="mb-2">
              <TextInput
                className="h-12 pl-2 pt-3 text-xl w-20"
                style={{ fontFamily: "Anek-R" }}
                height={60}
                borderRadius={10}
                multiline={false}
                backgroundColor="lightgray"
                placeholder={"3"}
                value={blank3}
                onChangeText={(text) => setBlank3(text)}
              />
            </View>
          </View>
        );
      }
    } else if (questionType == "new") {
      return (
        <ScrollView
          className="px-2"
          contentContainerStyle={{ paddingBottom: 70 }}
        >
          {Object.entries(allQuestions[currentQuestionIndex]?.content).map(
            ([key, value]) => (
              <TouchableOpacity
                key={key}
                activeOpacity={0.5}
                className="px-2 mb-5 rounded-xl pt-3 bg-slate-200 shadow-md"
              >
                <Text
                  style={{ fontFamily: "Anek-B" }}
                  className="text-black text-2xl"
                >
                  {value.new_word}
                </Text>
                {value.meaning && (
                  <Text
                    style={{ fontFamily: "Anek-R" }}
                    className="text-black text-xl"
                  >
                    👉 berarti{" "}
                    <Text className="text-blue-700 font-bold">
                      '{value.meaning}'
                    </Text>{" "}
                    dalam Bahasa Indonesia
                  </Text>
                )}
                {value.same_with && (
                  <Text
                    style={{ fontFamily: "Anek-R" }}
                    className="text-black text-xl"
                  >
                    🤝 sama dengan{" "}
                    <Text className="text-blue-700 font-bold">
                      '{value.same_with}'
                    </Text>{" "}
                    dalam Bahasa Betawi
                  </Text>
                )}
                <Text
                  style={{ fontFamily: "Anek-R" }}
                  className="text-black text-xl"
                >
                  <Text className="font-bold">Contoh: </Text> {value.example}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      );
      // <ScrollView className="px-2">
      //   <TouchableOpacity
      //     activeOpacity={0.5}
      //     className="px-2 mb-5 rounded-xl pt-3 bg-slate-200 shadow-md"
      //   >
      //     <Text
      //       style={{ fontFamily: "Anek-B" }}
      //       className="text-black text-2xl"
      //     >
      //       Ane
      //     </Text>
      //     <Text
      //       style={{ fontFamily: "Anek-R" }}
      //       className="text-black text-xl"
      //     >
      //       👉 berarti{" "}
      //       <Text className="text-blue-700 font-bold">'saya / aku'</Text>{" "}
      //       dalam Bahasa Indonesia
      //     </Text>
      //     <Text
      //       style={{ fontFamily: "Anek-R" }}
      //       className="text-black text-xl"
      //     >
      //       <Text className="font-bold">Contoh: </Text> Ane lagi di pasar.
      //     </Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     activeOpacity={0.5}
      //     className="px-2 mb-5 rounded-xl pt-3 bg-slate-200 shadow-md"
      //   >
      //     <Text
      //       style={{ fontFamily: "Anek-B" }}
      //       className="text-black text-2xl"
      //     >
      //       Ente
      //     </Text>
      //     <Text
      //       style={{ fontFamily: "Anek-R" }}
      //       className="text-black text-xl"
      //     >
      //       👉 berarti{" "}
      //       <Text className="text-blue-700 font-bold">'kamu / engkau'</Text>{" "}
      //       dalam Bahasa Indonesia
      //     </Text>
      //     <Text
      //       style={{ fontFamily: "Anek-R" }}
      //       className="text-black text-xl"
      //     >
      //       <Text className="font-bold">Contoh: </Text> Ente gimana sih.
      //     </Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     activeOpacity={0.5}
      //     className="px-2 mb-5 rounded-xl pt-3 bg-slate-200 shadow-md"
      //   >
      //     <Text
      //       style={{ fontFamily: "Anek-B" }}
      //       className="text-black text-2xl"
      //     >
      //       Die
      //     </Text>
      //     <Text
      //       style={{ fontFamily: "Anek-R" }}
      //       className="text-black text-xl"
      //     >
      //       👉 berarti <Text className="text-blue-700 font-bold">'dia'</Text>{" "}
      //       dalam Bahasa Indonesia
      //     </Text>
      //     <Text
      //       style={{ fontFamily: "Anek-R" }}
      //       className="text-black text-xl"
      //     >
      //       <Text className="font-bold">Contoh: </Text> Die lagi ke warung.
      //     </Text>
      //   </TouchableOpacity>
      // </ScrollView>
    }
  };

  // function handleChange(evt) {
  //   const value = evt.target.value;

  //   setManyText({
  //     ...manyText,

  //     [evt.target.name]: value,
  //   });
  // }

  // const renderOptions = () => {
  //   return (
  //     <View className="px-2 mt-5 mb-5">
  //       {allQuestions[currentQuestionIndex]?.options.map((option) => (
  //         <TouchableOpacity
  //           // onPress={() => validateAnswer(option)}
  //           onPress={() => setCurrentOptionSelected(option)}
  //           disabled={isOptionsDisabled}
  //           key={option}
  //           className={`rounded-lg bg-gray-50 ${
  //             currentOptionSelected == option ? "bg-yellow-100" : "bg-gray-50"
  //           } shadow-sm  flex-row justify-center items-center py-5 my-3`}
  //         >
  //           <Text
  //             style={{ fontFamily: "Anek-R" }}
  //             className="text-xl mt-1 text-black px-5"
  //           >
  //             {option}
  //           </Text>
  //         </TouchableOpacity>
  //       ))}
  //     </View>
  //   );
  // };

  // const renderInputBox = () => {
  //   if (questionType == "input") {
  //     return (
  //       <View className="px-2 mt-10 mb-5">
  //         <TextInput
  //           className="h-14 pl-2 pt-2 text-xl"
  //           style={{ fontFamily: "Anek-R" }}
  //           height={60}
  //           borderRadius={10}
  //           multiline={true}
  //           backgroundColor="lightgray"
  //           placeholder="Apa ya??"
  //           onChangeText={(e) => setText(e)}
  //           defaultValue={text}
  //         />
  //       </View>
  //     );
  //   }
  //   return null;
  // };

  const handleNext = () => {
    setIsNextDisabled(true);
    closeModal();
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setText("");
      setTimeout(() => setIsAnswerCorrect(false), 500);
      setBlank1("");
      setBlank2("");
      setBlank3("");
      // setShowNextButton(false);
      setQuestionType(allQuestions[currentQuestionIndex + 1]?.type);
      console.log(
        `The question is question: ${
          currentQuestionIndex + 1
        } and qType is ${questionType}`
      );
    }

    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const restartQuiz = () => {
    useEffect(() => {
      setShowScoreModal(false);

      setCurrentQuestionIndex(0);
      setScore(0);

      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
      Animated.timing(progress, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, []);
  };

  // const toggleModal = () => {
  //   setShowResponseModal(!showResponseModal);
  // };

  const renderCheckButton = () => {
    if (questionType == "choice") {
      return (
        <View className="absolute bottom-5 right-5 left-5">
          <TouchableOpacity
            className={`${
              currentOptionSelected === null
                ? "bg-gray-300"
                : "bg-blue-500 shadow-2xl"
            }  rounded-xl py-2 w-full`}
            disabled={currentOptionSelected === null ? true : false}
            onPress={() => checkAndModal(currentOptionSelected)}
          >
            <Text
              style={{ fontFamily: "Anek-SXB" }}
              className={`pt-3 text-center text-white text-2xl`}
            >
              {`Cek Jawaban `}
              <FontAwesome5
                className="pl-2"
                name={
                  currentOptionSelected === null
                    ? "question"
                    : "angle-double-up"
                }
                size={25}
              />
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (questionType == "input") {
      return (
        <View className="absolute bottom-5 right-5 left-5">
          <TouchableOpacity
            className={`${
              text === "" ? "bg-gray-300" : "bg-blue-500 shadow-2xl"
            } rounded-xl py-2 w-full`}
            disabled={text === "" ? true : false}
            onPress={() => checkAndModal()}
          >
            <Text
              style={{ fontFamily: "Anek-SXB" }}
              className={`pt-3 text-center text-white text-2xl`}
            >
              {`Cek Jawaban `}
              <FontAwesome5
                className="pl-2"
                name={text === "" ? "question" : "angle-double-up"}
                size={25}
              />
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (questionType == "fillBlank") {
      if ((allQuestions[currentQuestionIndex]?.answers).length == 1) {
        return (
          <View className="absolute bottom-5 right-5 left-5">
            <TouchableOpacity
              className={`${
                blank1 === "" ? "bg-gray-300" : "bg-blue-500"
              } shadow-2xl rounded-xl py-2 w-full`}
              disabled={blank1 === "" ? true : false}
              onPress={() => checkAndModal([blank1])}
            >
              <Text
                style={{ fontFamily: "Anek-SXB" }}
                className={`pt-3 text-center text-white text-2xl`}
              >
                {`Cek Jawaban `}
                <FontAwesome5
                  className="pl-2"
                  name={text === "" ? "question" : "angle-double-up"}
                  size={25}
                />
              </Text>
            </TouchableOpacity>
          </View>
        );
      } else if ((allQuestions[currentQuestionIndex]?.answers).length == 2) {
        return (
          <View className="absolute bottom-5 right-5 left-5">
            <TouchableOpacity
              className={`${
                blank1 === "" || blank2 === "" ? "bg-gray-300" : "bg-blue-500"
              } shadow-2xl rounded-xl py-2 w-full`}
              disabled={blank1 === "" || blank2 === "" ? true : false}
              onPress={() => checkAndModal([blank1, blank2])}
            >
              <Text
                style={{ fontFamily: "Anek-SXB" }}
                className={`pt-3 text-center text-white text-2xl`}
              >
                {`Cek Jawaban `}
                <FontAwesome5
                  className="pl-2"
                  name={text === "" ? "question" : "angle-double-up"}
                  size={25}
                />
              </Text>
            </TouchableOpacity>
          </View>
        );
      } else if ((allQuestions[currentQuestionIndex]?.answers).length == 3) {
        return (
          <View className="absolute bottom-5 right-5 left-5">
            <TouchableOpacity
              className={`${
                blank1 === "" || blank2 === "" || blank3 === ""
                  ? "bg-gray-300"
                  : "bg-blue-500"
              } shadow-2xl rounded-xl py-2 w-full`}
              disabled={blank1 === "" || blank2 === "" ? true : false}
              onPress={() => checkAndModal([blank1, blank2, blank3])}
            >
              <Text
                style={{ fontFamily: "Anek-SXB" }}
                className={`pt-3 text-center text-white text-2xl`}
              >
                {`Cek Jawaban `}
                <FontAwesome5
                  className="pl-2"
                  name={text === "" ? "question" : "angle-double-up"}
                  size={25}
                />
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
    } else if (questionType == "new") {
      return (
        <View className="absolute bottom-5 right-5 left-5">
          <TouchableOpacity
            className={`bg-purple-500 shadow-2xl rounded-xl py-2 w-full`}
            disabled={false}
            onPress={() => handleNext()}
          >
            <Text
              style={{ fontFamily: "Anek-SXB" }}
              className={`pt-3 text-center text-white text-2xl`}
            >
              Ok
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  // const renderNextButton = () => {
  //   if (showNextButton) {
  //     return (
  //       <TouchableOpacity
  //         onPress={() => handleNext()}
  //         className="bg-green-500 rounded-full py-2 font-bold w-20 self-center"
  //       >
  //         <Text
  //           style={{ fontSize: 20, color: COLORS.white, textAlign: "center" }}
  //         >
  //           Next
  //         </Text>
  //       </TouchableOpacity>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  // const fillBlankClassnameCheck = () => {
  //   fillBlankDisableCheck() == true
  //     ? "bg-gray-300  rounded-xl py-2 w-full"
  //     : "bg-blue-500 rounded-xl py-2 w-full";
  // };

  const renderProgressSection = () => {
    return (
      <View className="flex-row w-full gap-x-2">
        <AntDesign
          onPress={() => {
            Alert.alert(
              "Keluar dari level",
              "Apakah Anda yakin ingin kembali? (progres level tidak akan disimpan)",
              [
                {
                  text: "Tidak",
                  onPress: () => null,
                  style: "cancel",
                },
                { text: "Ya", onPress: () => navigation.goBack() },
              ]
            );
            return true;
          }}
          name="close"
          size={35}
          color="black"
        />
        <View className="flex-grow">
          <View
            style={{
              width: "100%",
              height: 20,
              borderRadius: 20,
              backgroundColor: "#00000020",
              paddingBottom: 10,
            }}
          >
            <Animated.View
              style={[
                {
                  height: 20,
                  borderRadius: 20,
                  backgroundColor: "#7DD3FC",
                },
                {
                  width: progressAnim,
                },
              ]}
            ></Animated.View>
          </View>
          <View className="items-end mr-2">
            <Text
              style={{ fontFamily: "Anek-SXB" }}
              className="text-black text-lg absolute top-20"
            >
              {currentQuestionIndex + 1} {"/"} {allQuestions.length}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });
  // const renderProgressBar = () => {
  //   return (
  //     <View
  //       style={{
  //         width: "100%",
  //         height: 20,
  //         borderRadius: 20,
  //         backgroundColor: "blue",
  //         paddingBottom: 10,
  //       }}
  //     >
  //       <Animated.View
  //         colo
  //         style={[
  //           {
  //             height: 20,
  //             borderRadius: 20,
  //           },
  //           {
  //             width: progressAnim,
  //           },
  //         ]}
  //       ></Animated.View>
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Modal
          style={{ margin: 0 }}
          hasBackdrop={false}
          isVisible={showScoreModal}
          className="flex-1 justify-center items-center bg-slate-100"
        >
          <Text
            style={{ fontFamily: "Anek-EB", fontSize: 48 }}
            className="tracking-widest"
          >
            Selesai!
          </Text>
          <View className="shadow-lg bg-white rounded-lg shadow-black">
            <Text
              style={{ fontFamily: "Anek-EB", fontSize: 20 }}
              className="bg-orange-200 w-36 px-4 text-orange-600 pt-2 rounded-t-lg"
            >
              <FontAwesome5 name="clock" size={20} />
              {"  "}
              <Text>{"0:20"}</Text>
            </Text>
            <Text
              style={{ fontFamily: "Anek-EB", fontSize: 20 }}
              className="bg-green-200 w-36 px-4 text-green-600 pt-2 rounded-none"
            >
              <FontAwesome5 name="check-circle" size={20} />
              {"  "}
              {`${((score / pointQuestionsTotal) * 100).toFixed(2)}%`}
            </Text>
            <Text
              style={{ fontFamily: "Anek-EB", fontSize: 20 }}
              className="bg-blue-200 w-36 px-4 text-blue-600 pt-2 rounded-b-lg"
            >
              <FontAwesome5 name="coins" size={20} /> {" +10"}
            </Text>
          </View>

          <TouchableOpacity
            className={`mt-5 rounded-full absolute bottom-5 px-3 bg-red-500
            }`}
            onPress={() => updateBetacoins()}
          >
            <Text
              style={{ fontFamily: "Anek-SXB" }}
              className="mt-1 py-2 px-5 text-center text-lg text-white"
            >
              <Ionicons name="home" color="white" size={30} />
            </Text>
          </TouchableOpacity>
        </Modal>
        <View className="flex-1 px-4 py-3">
          {/* {renderProgressBar()} */}
          {renderProgressSection()}
          {renderQuestion()}
          {renderAnswerMethod()}
          {/* {renderOptions()}
        {renderInputBox()} */}
          {/* {renderNextButton()} */}
          {renderCheckButton()}
          <Modal
            isVisible={showResponseModal}
            animationIn={"slideInUp"}
            animationOut={"slideOutDown"}
            className={`shadow-md  rounded-t-xl ${
              isAnswerCorrect ? "bg-lime-100" : "bg-red-100"
            }`}
            onModalShow={() => setIsNextDisabled(false)}
            hasBackdrop={false}
            backdropOpacity={0.1}
            style={{
              height: "auto",
              margin: 0,
              padding: 15,
              paddingTop: 25,
              maxHeight: 500,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <Text
              style={{ fontFamily: "Anek-SXB" }}
              className={`text-3xl pt-2 pl-1 ${
                isAnswerCorrect ? "text-lime-500" : "text-red-500"
              }`}
            >
              <FontAwesome
                name={isAnswerCorrect ? "check-circle" : "times-circle"}
                size={33}
              />
              {isAnswerCorrect ? corRes : wrongRes}
            </Text>
            {/* <Text className={`mt-2 mb-3 text-lime-500`}>
            Jawaban yang benar: aye
          </Text> */}
            <TouchableOpacity
              className={`mt-5 rounded-xl ${
                isAnswerCorrect ? "bg-lime-500" : "bg-red-500"
              }`}
              onPress={() => handleNext()}
              disabled={isNextDisabled}
            >
              <Text
                style={{ fontFamily: "Anek-EXB" }}
                className="mt-1 py-2 text-center text-lg text-white"
              >
                Lanjut
              </Text>
            </TouchableOpacity>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default StageScreen;

//   const renderQuestion = () => {
//     return (
//       <View
//         style={{
//           marginVertical: 40,
//         }}
//       >
//         {/* Question Counter */}
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "flex-end",
//           }}
//         >
//           <Text
//             style={{
//               color: COLORS.white,
//               fontSize: 20,
//               opacity: 0.6,
//               marginRight: 2,
//             }}
//           >
//             {currentQuestionIndex + 1}
//           </Text>
//           <Text style={{ color: COLORS.white, fontSize: 18, opacity: 0.6 }}>
//             / {allQuestions.length}
//           </Text>
//         </View>

//         {/* Question */}
//         <Text
//           style={{
//             color: COLORS.white,
//             fontSize: 30,
//           }}
//         >
//           {allQuestions[currentQuestionIndex]?.question}
//         </Text>
//       </View>
//     );
//   };
//   const renderOptions = () => {
//     return (
//       <View>
//         {allQuestions[currentQuestionIndex]?.options.map((option) => (
//           <TouchableOpacity
//             onPress={() => validateAnswer(option)}
//             disabled={isOptionsDisabled}
//             key={option}
//             style={{
//               borderWidth: 3,
//               borderColor:
//                 option == correctOption
//                   ? COLORS.success
//                   : option == currentOptionSelected
//                   ? COLORS.error
//                   : COLORS.secondary + "40",
//               backgroundColor:
//                 option == correctOption
//                   ? COLORS.success + "20"
//                   : option == currentOptionSelected
//                   ? COLORS.error + "20"
//                   : COLORS.secondary + "20",
//               height: 60,
//               borderRadius: 20,
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//               paddingHorizontal: 20,
//               marginVertical: 10,
//             }}
//           >
//             <Text style={{ fontSize: 20, color: COLORS.white }}>{option}</Text>

//             {/* Show Check Or Cross Icon based on correct answer*/}
//             {option == correctOption ? (
//               <View
//                 style={{
//                   width: 30,
//                   height: 30,
//                   borderRadius: 30 / 2,
//                   backgroundColor: COLORS.success,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <MaterialCommunityIcons
//                   name="check"
//                   style={{
//                     color: COLORS.white,
//                     fontSize: 20,
//                   }}
//                 />
//               </View>
//             ) : option == currentOptionSelected ? (
//               <View
//                 style={{
//                   width: 30,
//                   height: 30,
//                   borderRadius: 30 / 2,
//                   backgroundColor: COLORS.error,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <MaterialCommunityIcons
//                   name="close"
//                   style={{
//                     color: COLORS.white,
//                     fontSize: 20,
//                   }}
//                 />
//               </View>
//             ) : null}
//           </TouchableOpacity>
//         ))}
//       </View>
//     );
//   };
//   const renderNextButton = () => {
//     if (showNextButton) {
//       return (
//         <TouchableOpacity
//           onPress={() => handleNext()}
//           style={{
//             marginTop: 20,
//             width: "100%",
//             backgroundColor: COLORS.accent,
//             padding: 20,
//             borderRadius: 5,
//           }}
//         >
//           <Text
//             style={{ fontSize: 20, color: COLORS.white, textAlign: "center" }}
//           >
//             Next
//           </Text>
//         </TouchableOpacity>
//       );
//     } else {
//       return null;
//     }
//   };

//   const [progress, setProgress] = useState(new Animated.Value(0));
//   const progressAnim = progress.interpolate({
//     inputRange: [0, allQuestions.length],
//     outputRange: ["0%", "100%"],
//   });
//   const renderProgressBar = () => {
//     return (
//       <View
//         style={{
//           width: "100%",
//           height: 20,
//           borderRadius: 20,
//           backgroundColor: "#00000020",
//           paddingBottom: 10,
//         }}
//       >
//         <Animated.View
//           style={[
//             {
//               height: 20,
//               borderRadius: 20,
//               backgroundColor: COLORS.accent,
//             },
//             {
//               width: progressAnim,
//             },
//           ]}
//         ></Animated.View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//       }}
//     >
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
//       <View
//         style={{
//           flex: 1,
//           paddingVertical: 40,
//           paddingHorizontal: 16,
//           backgroundColor: COLORS.background,
//           position: "relative",
//         }}
//       >
//         {/* ProgressBar */}
//         {useEffect(() => {
//           renderProgressBar();
//           renderQuestion();
//           renderOptions();
//           renderNextButton();
//         }, [
//           renderProgressBar,
//           renderQuestion,
//           renderOptions,
//           renderNextButton,
//         ])}

//         {/* Score Modal */}
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={showScoreModal}
//         >
//           <View
//             style={{
//               flex: 1,
//               backgroundColor: COLORS.primary,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <View
//               style={{
//                 backgroundColor: COLORS.white,
//                 width: "90%",
//                 borderRadius: 20,
//                 padding: 20,
//                 alignItems: "center",
//               }}
//             >
//               <Text style={{ fontSize: 30, fontWeight: "bold" }}>
//                 {score > allQuestions.length / 2 ? "Congratulations!" : "Oops!"}
//               </Text>

//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                   marginVertical: 20,
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 30,
//                     color:
//                       score > allQuestions.length / 2
// ? COLORS.success
//                         : COLORS.error,
//                   }}
//                 >
//                   {score}
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     color: COLORS.black,
//                   }}
//                 >
//                   / {allQuestions.length}
//                 </Text>
//               </View>
//               {/* Retry Quiz button */}
//               <TouchableOpacity
//                 onPress={navigation.navigate("StageMenu")}
//                 style={{
//                   backgroundColor: COLORS.accent,
//                   padding: 20,
//                   width: "100%",
//                   borderRadius: 20,
//                 }}
//               >
//                 <Text
//                   style={{
//                     textAlign: "center",
//                     color: COLORS.white,
//                     fontSize: 20,
//                   }}
//                 >
//                   Retry Quiz
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//         {/* Background Image */}
//         <Image
//           style={{
//             width: SIZES.width,
//             height: 130,
//             zIndex: -1,
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             opacity: 0.5,
//           }}
//           resizeMode={"contain"}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };
