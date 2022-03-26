<template>
  <div class="user-profile">
    <div class="user-profile_user-panel">
      <h1 class="user-profile_username">{{ data.user.userName }}</h1>
      <div class="user-profile_admin-badge" v-if="data.user.isAdmin">Admin</div>
      <div class="user-profile_follower-count">
        <strong>Followers: </strong> {{ data.followers }}
      </div>
      <CreateTweet @add-tweet="addTweet" />
    </div>
    <div class="user-profile_tweets-wrapper">
      <TweetItems
        v-for="tweet in data.user.tweets"
        :key="tweet.id"
        :userName="data.user.userName"
        :tweet="tweet"
      />
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { users } from "../model/users";
import TweetItems from "./../components/TweetItems.vue";
import CreateTweet from "./../components/CreateTweet.vue";

export default {
  name: "userProfile",
  components: { CreateTweet, TweetItems },
  setup() {
    const route = useRoute();
    const userId = computed(() => route.params.userId);

    // get data or call api for data
    const data = reactive({
      followers: 0,
      user: users[userId.value - 1] || users[0],
    });

    function addTweet(tweet) {
      data.user.tweets.unshift({
        id: data.user.tweets.length + 1,
        msg: tweet,
      });
    }

    return {
      data,
      addTweet,
      userId,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 50px;
  padding: 50px 5%;

  .user-profile_user-panel {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #dfe6e8;
    margin-bottom: auto;

    h1 {
      margin: 0;
    }

    .user-profile_admin-badge {
      background: rgb(27, 137, 180);
      color: white;
      border-radius: 5px;
      margin-right: auto;
      padding: 0 10px;
      font-weight: bold;
    }
  }

  .user-profile_tweets-wrapper {
    display: grid;
    grid-gap: 10px;
    margin-bottom: auto;
  }
}
</style>
