import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Picker,
  Platform,
  Button,
  ActionSheetIOS,
} from "react-native";
import {
  TouchableWithoutFeedback,
  TextInput,
} from "react-native-gesture-handler";
import { connect } from "react-redux";
import { addForm } from "./Redux/action";

class NewFormPage extends Component {
  state = {
    textIOS: "Pilih jenis kelamin",
    fontColorIOS: "#d3d3d3",
    name: null,
    age: null,
    gender: null,
    phone: null,
    email: null,
  };

  onPressIOS = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Laki-Laki", "Perempuan"],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.setState({ textIOS: "Pilih jenis kelamin" });
          this.setState({ fontColorIOS: "#d3d3d3" });
        }
        if (buttonIndex === 1) {
          this.setState({ gender: "Laki-Laki" });
          this.setState({ textIOS: "Laki-Laki" });
          this.setState({ fontColorIOS: "black" });
        } else if (buttonIndex === 2) {
          this.setState({ gender: "Perempuan" });
          this.setState({ textIOS: "Perempuan" });
          this.setState({ fontColorIOS: "black" });
        }
      }
    );

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: "600",
            color: "#404040",
            marginBottom: 5,
          }}
        >
          Informasi Personal
        </Text>
        <InputForm
          question="Nama Lengkap"
          example="John Doe"
          onChangeText={(namaLengkap) => this.setState({ name: namaLengkap })}
        />
        <InputForm
          question="Umur"
          example="20"
          type="number-pad"
          onChangeText={(umur) => this.setState({ age: umur })}
        />
        <View style={{ marginTop: 8, marginBottom: 8, flexDirection: "row" }}>
          <Text
            style={{
              color: "#808080",
              fontSize: 17,
              marginLeft: 8,
              marginTop: 8,
              marginBottom: 8,
              width: 120,
            }}
          >
            Jenis Kelamin
          </Text>
          <View
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#808080",
              width: Dimensions.get("window").width - (20 + 20 + 120 + 8),
            }}
          >
            {Platform.OS === "ios" ? (
              <Button
                style={{
                  position: "absolute",
                  left: 0,
                }}
                color={this.state.fontColorIOS}
                onPress={this.onPressIOS}
                title={this.state.textIOS}
              >
                {this.textIOS}
              </Button>
            ) : (
              <Picker
                selectedValue={this.state.gender}
                onValueChange={(jenisKelamin) =>
                  this.setState({ gender: jenisKelamin })
                }
                style={{
                  fontSize: 17,
                }}
                mode="dropdown"
              >
                <Picker.Item label="Laki-Laki" value="Laki-Laki" />
                <Picker.Item label="Perempuan" value="Perempuan" />
              </Picker>
            )}
          </View>
        </View>
        <Text
          style={{
            fontSize: 19,
            fontWeight: "600",
            color: "#404040",
            marginTop: 30,
            marginBottom: 5,
          }}
        >
          Informasi Kontak
        </Text>
        <InputForm
          question="Nomor Telepon"
          example="081234567890"
          type="number-pad"
          onChangeText={(nomorTelp) => this.setState({ phone: nomorTelp })}
        />
        <InputForm
          question="Email"
          example="jdoe@email.com"
          type="email-address"
          onChangeText={(email) => this.setState({ email: email })}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.add(
              this.state.name,
              this.state.age,
              this.state.gender,
              this.state.phone,
              this.state.email
            );
            this.setState({
              name: null,
              age: null,
              gender: null,
              phone: null,
              email: null,
            });
            alert("Formulir berhasil ditambahkan!");
            this.props.navigation.navigate("Beranda");
          }}
        >
          <View
            style={{
              backgroundColor: "#55a9ed",
              borderRadius: 50,
              alignItems: "center",
              margin: 30,
            }}
          >
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 17,
                color: "white",
                padding: 8,
              }}
            >
              Simpan
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 13,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

class InputForm extends Component {
  render() {
    return (
      <View style={{ marginTop: 8, marginBottom: 8, flexDirection: "row" }}>
        <Text
          style={{
            color: "#808080",
            fontSize: 17,
            marginLeft: 8,
            marginTop: 8,
            marginBottom: 8,
            width: 120,
          }}
        >
          {this.props.question}
        </Text>
        <View
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#808080",
            width: Dimensions.get("window").width - (20 + 20 + 120 + 8),
          }}
        >
          <TextInput
            style={{
              fontSize: 17,
              padding: 8,
            }}
            placeholder={this.props.example}
            keyboardType={this.props.type}
            onChangeText={this.props.onChangeText}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: (name, age, gender, phone, email) =>
      dispatch(addForm(name, age, gender, phone, email)),
  };
};

export default connect(null, mapDispatchToProps)(NewFormPage);
