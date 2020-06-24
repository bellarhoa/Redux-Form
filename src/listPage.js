import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";

class ListPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate("Formulir Baru")}
        >
          <View
            style={{
              backgroundColor: "#55a9ed",
              borderRadius: 50,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 17,
                color: "white",
                margin: 8,
              }}
            >
              + Buat Formulir
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Text
          style={{
            fontSize: 19,
            fontWeight: "600",
            textTransform: "uppercase",
            color: "#404040",
            marginTop: 20,
            marginBottom: 5,
          }}
        >
          Hasil formulir
        </Text>
        <FlatList
          data={this.props.formData}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() =>
                this.props.navigation.navigate("Detail", { key: item.key })
              }
            >
              <RowForm name={item.name} age={item.age} gender={item.gender} />
            </TouchableWithoutFeedback>
          )}
          keyExtractor={(item) => item.key}
        />
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

class RowForm extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          width: Dimensions.get("window").width - (20 + 20 + 20),
          padding: 10,
          borderRadius: 5,
          backgroundColor: "#ffffff",
          margin: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {this.props.gender === "Laki-Laki" ? (
          <Icon
            name="md-male"
            type="ionicon"
            color="#118ab2"
            size={25}
            containerStyle={{ flex: 0.5 }}
          />
        ) : (
          <Icon
            name="md-female"
            type="ionicon"
            color="#ef476f"
            size={25}
            containerStyle={{ flex: 0.5 }}
          />
        )}
        <Text
          style={{
            flex: 3,
            fontSize: 17,
            fontWeight: "700",
          }}
        >
          {this.props.name}
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 17,
            fontWeight: "700",
            justifyContent: "flex-end",
          }}
        >
          {this.props.age} tahun
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    formData: state.formData,
  };
};

export default connect(mapStateToProps)(ListPage);
