import { useState, useEffect } from 'react'
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native'
import { EvilIcons } from '@expo/vector-icons'
import { Button } from '../Button'
import { Input } from '../Input'
import { colors, px } from '../../theme'
import { addItem, updateItem, deleteItem } from '../../services/api/requests'

export const FormModal = ({ visible, onClose, selectedItem }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)

  const closeModal = () => {
    setName('')
    setQuantity(1)
    onClose()
  }

  const onIncreaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const onDecreaseQuantity = () => {
    setQuantity(quantity - 1)
  }

  const onDelete = async () => {
    const result = await deleteItem(selectedItem?._id)
    if (result?.error) {
      Alert.alert('Error ao excluir item', 'por favor, tente novamente')
      return
    }
    closeModal()
  }

  const onSave = async () => {
    if (name.length <= 3) {
      Alert.alert('Nome do item deve conter mais de 3 caracteres')
      return
    }
    const result = (await selectedItem)
      ? updateItem(selectedItem._id, {
          name,
          quantity,
          checked: selectedItem.checked
        })
      : addItem({
          name,
          quantity
        })

    if (result?.error) {
      Alert.alert('Erro ao salvar item, por favor, tente novamente!')
      return
    }

    closeModal()
  }

  useEffect(() => {
    if (selectedItem && selectedItem?._id) {
      setName(selectedItem.name)
      setQuantity(selectedItem.quantity)
    } else {
      setName('')
      setQuantity(1)
    }
  }, [selectedItem])

  return (
    <Modal
      style={styles.modalContainer}
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackgroundView}>
        <View style={styles.modalContentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>
              {selectedItem ? 'Editar item' : 'Adicionar novo item'}
            </Text>
            <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
              <EvilIcons name="close" size={px(34)} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Input
            value={name}
            onChangeText={setName}
            label="Nome"
            placeholder="Ex: Arroz"
          />
          <Text style={styles.quantityLabel}>Quantidade</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={onIncreaseQuantity}
              style={styles.quantityButton}
            >
              <EvilIcons
                name="chevron-up"
                size={px(31)}
                color={colors.primary}
              />
            </TouchableOpacity>
            <Text style={styles.quantityTitle}>{quantity}</Text>
            <TouchableOpacity
              disabled={quantity == 1}
              onPress={onDecreaseQuantity}
              style={styles.quantityButton}
            >
              <EvilIcons
                name="chevron-down"
                size={px(31)}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
          <Button marginTop={px(24)} onClick={onSave}>
            {selectedItem ? 'Atualizar' : 'Adicionar'}
          </Button>
          {selectedItem && (
            <Button
              onClick={onDelete}
              marginTop={px(16)}
              variant="outline"
              icon="trash"
            >
              Excluir item
            </Button>
          )}
          <Button marginTop={px(16)} variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1
  },
  modalBackgroundView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.darkTransparent
  },
  modalContentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: px(502),
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: px(16),
    borderTopRightRadius: px(16)
  },
  headerContainer: {
    display: 'flex',
    height: px(60),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: px(1),
    borderBottomColor: colors.grey,
    marginBottom: px(24)
  },
  title: {
    fontSize: px(20),
    fontWeight: '500'
  },
  closeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'absolute',
    right: px(25)
  },
  quantityLabel: {
    fontSize: px(12),
    fontWeight: '600',
    width: px(358),
    textAlign: 'left',
    marginTop: px(12),
    marginBottom: px(12)
  },
  quantityContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: px(358),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: px(48)
  },
  quantityButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: px(32),
    height: px(32),
    borderRadius: px(16),
    backgroundColor: colors.light,
    borderWidth: px(1),
    borderColor: colors.primary
  },
  quantityTitle: {
    fontSize: px(56),
    fontWeight: 'bold'
  }
})
