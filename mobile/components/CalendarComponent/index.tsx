import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Modal, View } from 'react-native';
import HabitHistoryModal from '../HabitHistoryModal';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
  today: "Hoje"
};

LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarComponent() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState('');
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const handleCloseModal = () => {
    setModalVisible(false);
  };
 
  return (
    <View>
    <Calendar
      style={{
        borderWidth: 1,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        borderColor: '#DCDCDC',
      }}
      theme={{
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#000',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#000',
        dayTextColor: '#2d4150',
        textDisabledColor: '#DCDCDC'
      }}
      current={date.toISOString()}
      onDayPress={() => {
        setModalVisible(true); 
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true}
      }}
      maxDate={date.toISOString()}
      renderArrow={(direction) => (
        direction === 'left' ? (
          <FontAwesomeIcon icon={faArrowLeft} size={20} />
        ) : (
          <FontAwesomeIcon icon={faArrowRight} size={20} />
        )
      )}
    />
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <HabitHistoryModal setModalVisible={setModalVisible}/>
    </Modal>
    </View>
  );
}
