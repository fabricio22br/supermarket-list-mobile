import { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert
} from 'react-native'
import { px, colors } from '../../theme'
import { USERNAME_DB_KEY } from '../../services/constants'
import { getData } from '../../services/db'
import { ListCard, Button, Loader, FormModal } from '../../components'
import { getItems } from '../../services/api/requests'

export const MarketListScreen = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [marketList, setMarketList] = useState([])

  const getUsernameList = async () => {
    setLoading(true)
    const result = await getData(USERNAME_DB_KEY)
    if (result?.error) {
      Alert.alert('Falha ao retornar username')
      return
    }

    setUsername(result)
    const list = await getItems()
    if (list?.error) {
      Alert.alert('Falha ao retornar a lista')
      return
    }
    setMarketList(list)
    setLoading(false)
  }

  const onClickChangeUsername = () => {
    navigation.goBack()
  }

  useEffect(() => {
    if (modalVisible == false) {
      getUsernameList()
    }
  }, [modalVisible])

  const onClickItem = item => {
    setSelectedItem(item)
    setModalVisible(true)
  }

  const onCloseModal = () => {
    setSelectedItem(null)
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Olá, {username}!</Text>
        <Text style={styles.description}> Sua Lista de compras: </Text>
      </View>
      {loading && <Loader />}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentContainer}
        data={marketList}
        renderItem={({ item }) => (
          <ListCard onClickItem={() => onClickItem(item)} {...item} />
        )}
        keyExtractor={item => item._id}
        ListEmptyComponent={() =>
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Sua lista está Vazia.</Text>
              <Button
                onClick={onClickChangeUsername}
                marginTop={24}
                size="small"
                variant="outline"
              >
                Trocar de Úsuario.
              </Button>
            </View>
          )
        }
      />
      <View style={styles.buttonView}>
        <Button onClick={() => setModalVisible(true)}>
          Adicionar novo item
        </Button>
      </View>
      <FormModal
        visible={modalVisible}
        selectedItem={selectedItem}
        onClose={onCloseModal}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white
  },
  headerContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: px(24),
    marginTop: px(8)
  },
  title: {
    fontSize: px(24),
    fontWeight: 'bold'
  },
  description: {
    fontSize: px(16),
    marginTop: px(8)
  },
  buttonView: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: px(64)
  },
  emptyContainer: {
    height: px(450),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyTitle: {
    fontSize: px(18),
    fontWeight: '500'
  },
  flatListContentContainer: {
    paddingBottom: px(100)
  }
})
