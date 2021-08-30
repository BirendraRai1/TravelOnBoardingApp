import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Animated,
    SafeAreaView
} from 'react-native';

import { COLORS, SIZES, FONTS, images } from '../constants';

const { onboarding1, onboarding2, onboarding3 } = images

const onBoardings = [
    {
        title: "Let's Travelling",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: onboarding1
    },
    {
        title: "Navigation",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: onboarding2
    },
    {
        title: "Destination",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: onboarding3
    }
];

const OnBoarding = () => {

    const [completed, setCompleted] = useState(false);

    const scrollX = new Animated.Value(0);

    useEffect(() => {
        scrollX.addListener(({ value }) => {
            if (Math.floor(value / SIZES.width) === onBoardings.length - 1)
                setCompleted(true)
        })
        return () => scrollX.removeListener()
    }, [])

    const renderContent = () => (
        <Animated.ScrollView
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            snapToAlignment='end'
            scrollEventThrottle={16}
            onScroll={Animated.event([
                { nativeEvent: { contentOffset: { x: scrollX } } }
            ], { useNativeDriver: false })}
        >
            {onBoardings.map((item, index) => (
                <View
                    key={`img-${index}`}
                    style={{ width: SIZES.width }}
                >
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={item.img}
                            resizeMode='cover'
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </View>
                    <View style={{ position: 'absolute', bottom: '10%', left: 40, right: 40 }}>
                        <Text
                            style={{ ...FONTS.h1, color: COLORS.gray, textAlign: 'center' }}
                        >
                            {item.title}
                        </Text>
                        <Text
                            style={{ ...FONTS.body3, textAlign: 'center', color: COLORS.gray, marginTop: SIZES.base }}
                        >
                            {item.description}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            height: 60,
                            width: 150,
                            bottom: 0,
                            right: 0,
                            backgroundColor: COLORS.blue,
                            justifyContent: 'center',
                            borderTopLeftRadius: 30,
                            borderBottomLeftRadius: 30,
                            paddingLeft: 20
                        }}
                        onPress={() => console.log('Button on Pressed')}
                    >
                        <Text style={{ ...FONTS.h1, color: COLORS.white }}>{completed ? "Let's Go" : "Skip"}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </Animated.ScrollView>
    )

    const renderDots = () => {

        const dotPosition = Animated.divide(scrollX, SIZES.width);

        return (
            <View style={{ position: 'absolute', bottom: SIZES.height > 700 ? '20%' : '16%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: SIZES.padding, marginBottom: SIZES.padding * 3, marginTop: SIZES.padding / 2 }}>
                    {onBoardings.map((item, index) => {

                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })

                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base, 17, SIZES.base],
                            extrapolate: 'clamp'
                        })

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={{ width: dotSize, height: dotSize, borderRadius: SIZES.radius, backgroundColor: COLORS.blue, marginHorizontal: SIZES.radius / 2 }}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white }}>
            {renderContent()}
            {renderDots()}
        </SafeAreaView>
    )
}

export default OnBoarding;