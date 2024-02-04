import { View, Text } from 'react-native'
import React from 'react'
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import { sliderImages } from '../constast';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function ImageSlider() {
  return (
    <Carousel
        data={sliderImages}
        loop={true}
        autoplay={true}
        renderItem={ItemCard}
        hasParallaxImages={true}
        sliderWidth={wp(100)}
        firstItem={1}
        autoplayInterval={4000}
        itemWidth={wp(100)-70}
        slideStyle={{display: 'flex', alignItems: 'center'}}
    />

  )
}

const ItemCard = ({item, index}, parallaxProps)=>{
    return (
        <View style={{width: wp(100)-70, height: hp(25)}}>
            <ParallaxImage
                source={item}
                containerStyle={{borderRadius: 15, flex:1}}
                style={{resizeMode: 'contain'}}
                parallaxFactor={1}
                {...parallaxProps}
            />
        </View>
    )
}