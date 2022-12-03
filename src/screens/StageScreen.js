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
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

// TODO: Change the buttons to use flatlist and rendered with map function. Don't use scrollview for list with many children.

const StageScreen = ({ navigation }) => {
  const [sound, setSound] = useState("");

  async function playCorrect() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/correct.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function playWrong() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/wrong.mp3")
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

  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
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

      if (loweredAnswer == correct_answer) {
        playCorrect();
        setIsAnswerCorrect(true);
      } else if (loweredAnswer != correct_answer) {
        playWrong();
        setIsAnswerCorrect(false);
      }
    }
    // Show Next Button
  };

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
          {allQuestions[currentQuestionIndex]?.question}
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
            defaultValue={text}
          />
        </View>
      );
    } else if (questionType == "fillBlank") {
      return (
        <View
          className={`${
            isKeyboardVisible ? "mt-3" : "mt-10"
          } px-2 mb-5 gap-x-2 flex-row justify-center`}
        >
          {allQuestions[currentQuestionIndex]?.answers.map((data, index) => (
            <View key={data} className="mb-2">
              <TextInput
                className="h-12 pl-2 pt-3 text-xl w-20"
                style={{ fontFamily: "Anek-R" }}
                height={60}
                borderRadius={10}
                multiline={true}
                backgroundColor="lightgray"
                placeholder={(index + 1).toString()}
                // value={allQuestions[currentQuestionIndex]?.answers}
                // //not done
                // onChangeText={(text) => setBlank${index+1}({ text })}
              />
            </View>
          ))}
        </View>
      );
    } else if (questionType == "new") {
      return (
        <ScrollView className="px-2">
          <TouchableOpacity
            activeOpacity={0.5}
            className="px-2 mb-5 rounded-xl pt-3 bg-slate-200 shadow-md"
          >
            <Text
              style={{ fontFamily: "Anek-B" }}
              className="text-black text-2xl"
            >
              Ane
            </Text>
            <Text
              style={{ fontFamily: "Anek-R" }}
              className="text-black text-xl"
            >
              👉 berarti{" "}
              <Text className="text-blue-700 font-bold">'saya / aku'</Text>{" "}
              dalam Bahasa Indonesia
            </Text>
            <Text
              style={{ fontFamily: "Anek-R" }}
              className="text-black text-xl"
            >
              <Text className="font-bold">Contoh: </Text> Ane lagi di pasar.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            className="px-2 mb-5 rounded-xl pt-3 bg-slate-200 shadow-md"
          >
            <Text
              style={{ fontFamily: "Anek-B" }}
              className="text-black text-2xl"
            >
              Ente
            </Text>
            <Text
              style={{ fontFamily: "Anek-R" }}
              className="text-black text-xl"
            >
              👉 berarti{" "}
              <Text className="text-blue-700 font-bold">'kamu / engkau'</Text>{" "}
              dalam Bahasa Indonesia
            </Text>
            <Text
              style={{ fontFamily: "Anek-R" }}
              className="text-black text-xl"
            >
              <Text className="font-bold">Contoh: </Text> Ente gimana sih.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            className="px-2 mb-5 rounded-xl pt-3 bg-slate-200 shadow-md"
          >
            <Text
              style={{ fontFamily: "Anek-B" }}
              className="text-black text-2xl"
            >
              Die
            </Text>
            <Text
              style={{ fontFamily: "Anek-R" }}
              className="text-black text-xl"
            >
              👉 berarti <Text className="text-blue-700 font-bold">'dia'</Text>{" "}
              dalam Bahasa Indonesia
            </Text>
            <Text
              style={{ fontFamily: "Anek-R" }}
              className="text-black text-xl"
            >
              <Text className="font-bold">Contoh: </Text> Die lagi ke warung.
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            activeOpacity={0.5}
            className="px-2 mb-5 rounded-xl pt-3 bg-slate-200 shadow-md "
          >
            <Text
              style={{ fontFamily: "Anek-B" }}
              className="text-black text-2xl"
            >
              Die
            </Text>
            <Text
              style={{ fontFamily: "Anek-R" }}
              className="text-black text-xl"
            >
              👉 berarti <Text className="text-blue-700 font-bold">'dia'</Text>{" "}
              dalam Bahasa Indonesia
            </Text>
            <Text
              style={{ fontFamily: "Anek-R" }}
              className="text-black text-xl"
            >
              <Text className="font-bold">Contoh: </Text> Die lagi ke warung.
            </Text>
          </TouchableOpacity> */}
        </ScrollView>
      );
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
                  currentOptionSelected === null ? "question" : "user-check"
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
                name={text === "" ? "question" : "user-check"}
                size={25}
              />
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (questionType == "fillBlank") {
      return (
        <View className="absolute bottom-5 right-5 left-5">
          <TouchableOpacity
            className={`${
              true === true ? "bg-blue-500" : "bg-blue-500 shadow-2xl"
            } rounded-xl py-2 w-full`}
            onPress={() => checkAndModal()}
          >
            <Text
              style={{ fontFamily: "Anek-SXB" }}
              className={`pt-3 text-center text-white text-2xl`}
            >
              {`Cek Jawaban `}
              <FontAwesome5
                className="pl-2"
                name={text === "" ? "question" : "user-check"}
                size={25}
              />
            </Text>
          </TouchableOpacity>
        </View>
      );
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
              className="bg-gradient-to-r from-blue-300 to-blue-500"
              style={[
                {
                  height: 20,
                  borderRadius: 20,
                  backgroundColor: "#3b82f6",
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
              className="text-black text-lg"
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
//                         ? COLORS.success
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

// TODO: Remove bottom nav
