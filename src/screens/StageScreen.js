import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import data from "../data/StageData";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import AwesomeButton from "react-native-really-awesome-button-fixed";
import Modal from "react-native-modal";

const StageScreen = ({ navigation }) => {
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
  const [questionType, setQuestionType] = useState(
    allQuestions[currentQuestionIndex]?.type
  );

  const validateAnswer = (selectedOption) => {
    if (questionType == "choice") {
      let correct_option = allQuestions[currentQuestionIndex]["correct_option"];
      setCurrentOptionSelected(selectedOption);
      setCorrectOption(correct_option);

      if (selectedOption == correct_option) {
        setIsAnswerCorrect(true);
        // Set Score
      }
    } else if (questionType == "input") {
      let correct_answer = allQuestions[currentQuestionIndex]["correct_answer"];
      const loweredAnswer = text.toLowerCase().trim();
      console.log(`correct_answer: ${correct_answer}`);
      console.log(`loweredAnswer: ${correct_answer}`);

      if (loweredAnswer == correct_answer) {
        setIsAnswerCorrect(true);
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
    return (
      <View>
        {/* Question Counter */}
        <View className="flex-row items-end">
          <Text className="text-black text-lg mr-2">
            {currentQuestionIndex + 1} {"/"}
          </Text>
          <Text className="text-black text-lg mr-2">{allQuestions.length}</Text>
        </View>
        {/* Question */}
        <Text className="mt-6 text-2xl text-black">
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };

  const renderOptions = () => {
    if (questionType == "choice") {
      return (
        <View className="px-2 mt-5 mb-5">
          {allQuestions[currentQuestionIndex]?.options.map((option) => (
            <TouchableOpacity
              // onPress={() => validateAnswer(option)}
              onPress={() => setCurrentOptionSelected(option)}
              disabled={isOptionsDisabled}
              key={option}
              className={`rounded-lg bg-gray-50 ${
                currentOptionSelected == option ? "bg-yellow-100" : "bg-gray-50"
              } shadow-lg shadow-black flex-row justify-between items-center py-5 my-3`}
            >
              <Text className="text-xl text-black px-5">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return null;
  };

  const renderInputBox = () => {
    if (questionType == "input") {
      return (
        <View className="px-2 mt-10 mb-5">
          <TextInput
            className="h-12 pl-2 text-xl"
            height={60}
            borderRadius={10}
            multiline={true}
            backgroundColor="lightgray"
            placeholder="Apa ya??"
            onChangeText={(e) => setText(e)}
            defaultValue={text}
          />
        </View>
      );
    }
    return null;
  };

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
              currentOptionSelected === null ? "bg-gray-300" : "bg-blue-500"
            } shadow-xl rounded-xl py-2 w-full`}
            disabled={currentOptionSelected === null ? true : false}
            onPress={() => checkAndModal(currentOptionSelected)}
          >
            <Text className={`font-bold text-center text-white text-2xl`}>
              Cek Jawaban
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (questionType == "input") {
      return (
        <View className="absolute bottom-5 right-5 left-5">
          <TouchableOpacity
            className={`${
              text === "" ? "bg-gray-300" : "bg-blue-500"
            } shadow-xl rounded-xl py-2 w-full`}
            disabled={text === "" ? true : false}
            onPress={() => checkAndModal()}
          >
            <Text className={`font-bold text-center text-white text-2xl`}>
              Cek Jawaban
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={() => handleNext()}
          className="bg-green-500 rounded-full py-2 font-bold w-20 self-center"
        >
          <Text
            style={{ fontSize: 20, color: COLORS.white, textAlign: "center" }}
          >
            Next
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });
  const renderProgressBar = () => {
    return (
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
              backgroundColor: COLORS.accent,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-4 py-3">
        {renderProgressBar()}
        {renderQuestion()}
        {renderOptions()}
        {renderInputBox()}
        {/* {renderNextButton()} */}
        {renderCheckButton()}
        <Modal
          isVisible={showResponseModal}
          animationIn={"slideInUp"}
          animationOut={"slideOutDown"}
          className={`shadow-lg shadow-black rounded-t-xl ${
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
            className={`text-2xl font-bold ${
              isAnswerCorrect ? "text-lime-500" : "text-red-500"
            }`}
          >
            {isAnswerCorrect ? "Benar!" : "Salah"}
          </Text>
          {/* <Text className={`mt-2 mb-3 text-lime-500`}>
            Jawaban yang benar: aye
          </Text> */}
          <TouchableOpacity
            className={`py-3 mt-5 shadow-sm shadow-black rounded-xl ${
              isAnswerCorrect ? "bg-lime-500" : "bg-red-500"
            }`}
            onPress={() => handleNext()}
          >
            <Text className="font-bold text-center text-lg text-white">
              Lanjut
            </Text>
          </TouchableOpacity>
        </Modal>
      </View>
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
