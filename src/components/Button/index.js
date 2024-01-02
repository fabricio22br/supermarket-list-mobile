import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export const Button = ({ text, marginTop, onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{ ...styles.buttonContainer, marginTop: marginTop || 0 }}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 358,
    height: 56,
    backgroundColor: '#7785db',
    borderRadius: 24
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})
