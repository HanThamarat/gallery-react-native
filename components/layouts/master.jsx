import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';

export default function MasterLayout({children}) {
    return(
    <SafeAreaView className="bg-primary h-full">
        <ScrollView 
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