<template>
  <form
    class="create-tweet_panel"
    @submit.prevent="createNewTweet"
    :class="{ '--exceeded': newTweetCharacterCount > 180 }"
  >
    <label for="newTweet">
      <strong>New Tweet</strong>({{ newTweetCharacterCount }} / 180)
    </label>
    <textarea id="newTweet" rows="4" v-model="data.newTweetContent"></textarea>

    <div class="create-tweet_panel-submit">
      <div class="create-tweet-type">
        <label for="newTweetType"><strong>Type: </strong></label>
        <select id="newTweeType" v-model="data.selectedTweetType">
          <option
            :value="option.name"
            v-for="option in data.tweetTypes"
            :key="option.name"
          >
            {{ option.value }}
          </option>
        </select>
      </div>

      <button>Tweet</button>
    </div>
  </form>
</template>

<script>
import { reactive, computed } from "vue";

export default {
  name: "CreateTweet",

  setup(props, ctx) {
    // Composition API Syntax
    
    // get data or call api for data
    const data = reactive({
      // data()
      newTweetContent: "",
      selectedTweetType: "instant",
      tweetTypes: [
        { name: "draft", value: "Draft" },
        { name: "instant", value: "Instant Tweet" },
      ],
      followers: 0,
    });

    const newTweetCharacterCount = computed(() => data.newTweetContent.length); // computed()

    function createNewTweet() {
      // methods()
      if (data.newTweetContent && data.selectedTweetType !== "draft") {
        ctx.emit("add-tweet", data.newTweetContent);
        data.newTweetContent = "";
      }
    }

    return {
      data,
      newTweetCharacterCount,
      createNewTweet,
    };
  },
};
</script>

<style lang="scss" scoped>
.create-tweet_panel {
  margin-top: 20px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;

  textarea {
    border: 1px solid #dfe3e8;
    border-radius: 5px;
  }

  .create-tweet_panel-submit {
    display: flex;
    justify-content: space-between;

    .create-tweet-type {
      padding: 10px 0;
    }

    button {
      padding: 5px 20px;
      margin: auto 0;
      border-radius: 5px;
      border: none;
      background-color: deeppink;
      color: white;
      font-weight: bold;
    }
  }

  &.--exceeded {
    color: red;
    border-color: red;

    .create-tweet_panel-submit {
      button {
        background-color: red;
        color: white;
      }
    }
  }
}
</style>
