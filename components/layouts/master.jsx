import React, { useRef } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

export default function MasterLayout({children}) {

    const ref = useRef(null);
    useScrollToTop(ref);

    return(
    <SafeAreaView className="bg-primary h-full">
        <ScrollView 
            ref={ref}
            disableScrollViewPanResponder={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View className="flex justify-center h-full w-full px-4 items-center bg-primary">
                {children}
            </View>
        </ScrollView>
    </SafeAreaView>
    );
}