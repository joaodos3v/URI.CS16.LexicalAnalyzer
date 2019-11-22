<template>
  <v-app>
    <v-app-bar app dark color="blue-grey darken-1">
      <h2 class="d-flex display-1">Analisador Léxico</h2>
      <v-spacer></v-spacer>
      <HeaderButtons />
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <TokenCard :tokens="tokens" :attempts="attempts" :tokenMaxLength="tokenMaxLength"
              @tokenAdded="addToken" @tokenDeleted="deleteToken" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <StateTable :automaton="automaton" :tokenMaxLength="tokenMaxLength"
              :tokenIsValid="tokenIsValid" :tokenIsNonFinal="tokenIsNonFinal" :follow="follow"  />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HeaderButtons from "@/components/layout/HeaderButtons";
import TokenCard from "./components/TokenCard";
import StateTable from "./components/StateTable";
import Bus from "@/Bus.js";

export default {
  name: 'App',

  components: {
    HeaderButtons, StateTable, TokenCard
  },

  created() {
    Bus.onTokenValidate(obj => {
      this.validateToken(obj);
    });
  },

  data: () => ({
    tokenMaxLength: 30,
    tokens: [],
    tokenIsValid: false,
    tokenIsNonFinal: true,
    automaton: {},
    attempts: [],
    follow: {
      currentState: null,
      currentColumn: null
    },
  }),

  methods: {
    addToken(newToken) {
      this.tokens.push(newToken);
    },
    deleteToken(i) {
      this.tokens.splice(i, 1);
    },
    validateToken(obj) {
      if (!obj || ('token' in obj && obj.token == "")) {
        this._setTokenAs("nonFinal", false);
        return;
      }

      const { token, save } = obj;
      const states = this.automaton.body;
      const characters = token.split("");
      const firstCharacter = characters[0];
      const initialState = "q0";
      
      if (Object.keys(states[initialState]).includes(firstCharacter)) {
        let currentState = initialState;
        let char = firstCharacter;
        for (let i = 0; i < characters.length; i++) {
          const nextState = states[currentState][char];
          this.follow = {currentState: currentState, currentColumn: char};
          if (!nextState) {
            this._setTokenAs("invalid", save, token);
            return;
          }
          currentState = nextState;
          char = characters[i + 1];
        }

        if (states[currentState].includes("-")) {
          this._setTokenAs("valid", save, token);
        } else {
          this._setTokenAs("nonFinal", save, token);
        }
      } else {
        this._setTokenAs("invalid", save, token);
      }
    },
    _buildAutomaton() {
      const alphabet = this._getAlphabet();
      const rows = this._getRows(alphabet);

      this.automaton = [];
      this.automaton = {
        header: alphabet,
        body: rows,
      };
    },
    _getAlphabet() {
      let alphabet = [];
      this.tokens.map(token => {
        const tokenLetters = token.split("");
        const uniqueLetters = tokenLetters.filter((char, i, arr) => arr.indexOf(char) == i);
        uniqueLetters.map(char => {
          if (!alphabet.includes(char)) {
            alphabet.push(char);
          }
        });
      });

      return alphabet.sort();
    },
    _getRows(alphabet) {
      let automaton = {"q0": []};
      this.tokens.map(token => {
        const characters = token.split("");
        const firstCharacter = characters[0];
        const initialState = "q0";

        if (Object.keys(automaton[initialState]).includes(firstCharacter)) {
          let char = firstCharacter
          let currentState = initialState;
          for (let i = 0; i < characters.length; i++) {
            const nextState = automaton[currentState][char];
            if (!nextState) {
              const nextStateNumber = this._defineNextState(automaton);
              automaton[currentState][char] = `q${nextStateNumber}`;
              const newStates = this._generateNewStates(alphabet.length, token, i, nextStateNumber);
              const keys = Object.keys(newStates);
              keys.map(key => automaton[key] = newStates[key]);
              break;
            }

            char = characters[i + 1];
            currentState = nextState;
          }
        } else {
          const nextStateNumber = this._defineNextState(automaton);
          automaton[initialState][firstCharacter] = `q${nextStateNumber}`;
          const newStates = this._generateNewStates(alphabet.length, token, 0, nextStateNumber);
          const keys = Object.keys(newStates);
          keys.map(key => automaton[key] = newStates[key]);
        }
      });

      return automaton;
    },
    _defineNextState(currentAutomaton) {
      const states = Object.keys(currentAutomaton);
      const lastState = states[states.length - 1];
      const lastStateNumber = parseInt(lastState.split("q").pop());
      const nextStateNumber = lastStateNumber + 1;

      return nextStateNumber;
    },
    _generateNewStates(numberOfColumns, token, tokenStartIndex, currentStateNumber) {
      let newStates = {};
      const currentToken = token.substr(tokenStartIndex + 1);
      currentToken.split("").map(char => {
        const nextStateNumber = currentStateNumber + 1;
        newStates[`q${currentStateNumber}`] = [];
        newStates[`q${currentStateNumber}`][char] = `q${nextStateNumber}`;
        currentStateNumber = nextStateNumber;
      });
      newStates[`q${currentStateNumber}`] = Array(numberOfColumns).fill("-");

      return newStates;
    },
    _setTokenAs(state, save, token = null) {
      let valid = true;
      let nonFinal = false;
      let messageClass = "success";
      if (state === "nonFinal") {
        valid = false;
        nonFinal = true;
        messageClass = "info";
      } else if (state === "invalid") {
        valid = false;
        messageClass = "error";
      }
      
      this.tokenIsValid = valid;
      this.tokenIsNonFinal = nonFinal;
      if (save) {
        this.attempts.push({token, valid, nonFinal});
        this._showToasted(messageClass);
      }
    },
    _showToasted(type) {
      let text = "Token em Estado Não-Final!";
      let icon = "mdi-alert-circle";
      
      if (type === "error") {
        text = "Token Inválido!";
        icon = "mdi-close-circle";
      } else if (type === "success") {
        text = "Token Válido!";
        icon = "mdi-check-circle";
      }

      this.$toasted.show(text, {
        type: type,
        icon: icon
      });

      this.follow = {currentState: null, currentColumn: null};
      this._setTokenAs("nonFinal", false);
    },
  },

  watch: {
    tokens() {
      this._buildAutomaton();
    }
  }
};
</script>
