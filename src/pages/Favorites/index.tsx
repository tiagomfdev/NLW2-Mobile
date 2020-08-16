import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView } from 'react-native';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';



function Favorites () {
    const [favorites, setFavorites] = useState([]);
    
    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                setFavorites(JSON.parse(response));
            }
        });        
    }

    useFocusEffect(() => {
        loadFavorites();
    });
 
    return (
        <View style={styles.container}>
            <View style={styles.container} >
                <PageHeader title="Meus proffys favoritos" />
        
                <ScrollView
                    style={styles.teacherList}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingBottom: 16,
                    }}
                >
                    {favorites.map((teacher:Teacher) => {                        
                        const teacherItem = favorites.find( ({ id }:Teacher) => { return id === teacher.id } );
                        return(
                            <TeacherItem 
                                key={teacher.id} 
                                teacher={teacher}
                                favorited={ teacherItem ? true : false } 
                            />
                        )
                    })}
                </ScrollView>

            </View>
        </View>
    )
}

export default Favorites;