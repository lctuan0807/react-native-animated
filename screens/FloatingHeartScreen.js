import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Easing } from "react-native-reanimated";

const { height } = Dimensions.get("window");

let animationEndY = Math.ceil(height * 0.7);
let negativeEndY = animationEndY * -1;
let heartCount = 1;

const Heart = (props) => {
  return (
    <View {...props} style={[styles.heart, props.style]}>
      <AntDesign name="heart" size={24} color={props.color} />
    </View>
  );
};

const HeartContainer = ({ style, onComplete, heartColor }) => {
  const [position, setPosition] = useState(new Animated.Value(0));

  let translateY = position.interpolate({
    inputRange: [negativeEndY, 0],
    outputRange: [animationEndY, 0],
  });

  const opacity = position.interpolate({
    inputRange: [0, animationEndY - 100, animationEndY],
    outputRange: [1, 0.4, 0],
  });

  const scale = translateY.interpolate({
    inputRange: [0, 15, 30],
    outputRange: [0, 1.4, 1],
    extrapolate: "clamp",
  });

  const translateX = translateY.interpolate({
    inputRange: [
      0,
      animationEndY / 6,
      animationEndY / 3,
      animationEndY / 2,
      animationEndY,
    ],
    outputRange: [0, 40, 20, 0, 15],
  });

  const rotate = translateY.interpolate({
    inputRange: [
      0,
      animationEndY / 6,
      animationEndY / 3,
      animationEndY / 2,
      animationEndY,
    ],
    outputRange: ["0deg", "-10deg", "0deg", "10deg", "0deg"],
  });

  useEffect(() => {
    Animated.timing(position, {
      duration: 2000,
      toValue: negativeEndY,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(onComplete);
  }, []);

  const getHeartStyle = () => {
    return {
      transform: [
        { translateY: position },
        { scale: scale },
        { translateX: translateX },
        { rotate: rotate },
      ],
      opacity: opacity,
    };
  };

  return (
    <Animated.View style={[styles.heartContainer, style, getHeartStyle()]}>
      <Heart color={heartColor} />
    </Animated.View>
  );
};

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomColor() {
  return `#${(((1 << 24) * (Math.random() + 1)) | 0).toString(16).substr(1)}`;
}

export default function FloatingHeartScreen({}) {
  const [hearts, setHearts] = useState([]);

  function addHeart() {
    setHearts([
      ...hearts,
      {
        id: heartCount,
        right: getRandomNumber(20, 150),
        color: getRandomColor(),
      },
    ]);
    heartCount++;
  }

  const removeHeart = (heartId) => {
    setHearts((hearts) => hearts.filter(({ id }) => heartId !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {hearts.map((heart) => (
          <HeartContainer
            key={heart.id}
            style={{ right: heart.right }}
            heartColor={heart.color}
            onComplete={() => removeHeart(heart.id)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => addHeart()}>
        <AntDesign name="hearto" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#6552D1",
    position: "absolute",
    bottom: 32,
    left: 32,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  heartContainer: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "transparent",
  },
  heart: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
