import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { connect } from "react-redux";
import { delForm } from "./Redux/action";

class DetailsPage extends Component {
  state = {
    key: this.props.route.params.key,
    formData: this.props.formData,
    name: null,
    age: null,
    gender: null,
    phone: null,
    email: null,
  };

  componentDidMount() {
    for (let i = 0; i < this.state.formData.length; i++) {
      if (this.state.formData[i].key === this.state.key) {
        this.setState({
          name: this.state.formData[i].name,
          age: this.state.formData[i].age,
          gender: this.state.formData[i].gender,
          phone: this.state.formData[i].phone,
          email: this.state.formData[i].email,
        });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 30,
            justifyContent: "space-around",
          }}
        >
          <Button
            title="Edit Formulir"
            onPress={() => {
              this.props.navigation.navigate("Edit Formulir", {
                key: this.state.key,
              });
            }}
          />
          <Button
            title="Hapus Formulir"
            color="red"
            onPress={() => {
              this.setState({
                key: null,
                formData: null,
                name: null,
                age: null,
                gender: null,
                phone: null,
                email: null,
              });
              alert("Formulir berhasil dihapuskan!");
              this.props.delete(this.state.key);
              this.props.navigation.navigate("Beranda");
            }}
          />
        </View>
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
        <ReadForm question="Nama Lengkap" answer={this.state.name} />
        <ReadForm question="Umur" answer={this.state.age} />
        <ReadForm question="Jenis Kelamin" answer={this.state.gender} />
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
        <ReadForm question="Nomor Telepon" answer={this.state.phone} />
        <ReadForm question="Email" answer={this.state.email} />
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

class ReadForm extends Component {
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
            width: Dimensions.get("window").width - (20 + 20 + 120 + 8),
          }}
        >
          <Text style={{ fontSize: 17, padding: 8 }}>{this.props.answer}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    formData: state.formData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delete: (key) => dispatch(delForm(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
