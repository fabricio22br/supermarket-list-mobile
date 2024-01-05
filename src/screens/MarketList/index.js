import { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native'
import { px, colors } from '../../theme'
import { USERNAME_DB_KEY } from '../../services/constants'
import { getData } from '../../services/db'
import { ListCard, Button } from '../../components'

const fakeList = [
  {
    id: 0,
    name: 'Arroz',
    quantity: 2,
    checked: true
  },
  {
    id: 1,
    name: 'Feijão',
    quantity: 3,
    checked: true
  },
  {
    id: 2,
    name: 'Macarrão',
    quantity: 5,
    checked: false
  },
  {
    id: 3,
    name: 'Farinha',
    quantity: 6,
    checked: false
  }
]

export const MarketListScreen = () => {
  const [username, setUsername] = useState('')

  const returnUsername = async () => {
    const result = await getData(USERNAME_DB_KEY)
    if (!result?.error) {
      setUsername(result)
    }
  }

  useEffect(() => {
    returnUsername()
  }, [])

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>ola, {username}!</Text>
        <Text style={styles.description}> Sua Lista de compras: </Text>
      </View>
      <FlatList
        data={fakeList}
        renderItem={({ item }) => <ListCard {...item} />}
        keyExtractor={item => item.id}
      />
      <View style={styles.buttonView}>
        <Button>Adicionar novo item</Button>
      </View>
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
  }
})