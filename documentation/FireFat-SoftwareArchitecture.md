# Use-Cases

## Authentication
- Sign-up
- Sign-in
- Sign-out

## Settings
- New game
- Apply to a game
- Set participant status (priviledge)
- Set current game
- Game setup
- Delete game

## Play
- Enter weight
- Enter payment
- Set vacation start date

## Results
- View game summary (game settings)
- View personal progress
- View result (given a date, or final result)

## Feed
- Messages

## Home
- Player info
- Game info
- Help/ Instructions

## Menu
 - Help
 - Sign-out
 - Profile

# Database/ Data model

Database: scaleup
    Table         |    Fields

    player          (PK)    player_id
                            player_name
                            player_email
                            current_game (game_id)
			                player_height

    player_login    (PK FK) player_id
                            player_password

    game            (PK)    game_id
		            (FK)    owner (player_id)
                            game_name
                            game_info
                            game_start_date
                            no_weight
                            weight_frequency
                            min_loss
                            weight_unit
                            game_fee
                            fee_currency
                            vacation_length
                            last_weight_paid


    participant     (PK FK) game_id
                    (PK FK) player_id
                            weight_goal
                            vacation_start
                            status (null, player, admin)

    schedule        (PK FK) game_id
                    (PK FK) date_id
                            weight_date

    player_weight   (PK FK) game_id
                    (PK FK) player_id
                    (PK FK) date_id
                            weight_measure

    payment         (PK FK) game_id
                    (PK FK) player_id
                    (PK)    payment_date
                            amount_paid




# Game Instructions

1. The first player registered is the admin (game owner)
2. The admin must set the dates before the input of any weight
3. Each player should enter the weight on the set dates
4. Each user can view her or his own records
5. When finished the game (all weights on the dates), each player can view the overall result, the ranking of greater percentual weight loss
6. The admin can clear all records in the database


# Session Management
- game_id
- name
- player_id

# Angular/ Ionic

Pages:
 - firefat-play
	enter weight
	set vacation
	enter payment
 - firefat-view
    personal progress
    ranking
 - firefat-game
	new game
	change current game
	ranking
# Pictures

All pictures from www.publicdomainpictures.net


# From FireStore

Temporary credential:
email: admin@firefat.com
password: 123456


<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.17.2/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCfcVd1Q86ehYrA9jPbTOhRbyTrXPX3wzA",
    authDomain: "firefat-5b99f.firebaseapp.com",
    databaseURL: "https://firefat-5b99f.firebaseio.com",
    projectId: "firefat-5b99f",
    storageBucket: "firefat-5b99f.appspot.com",
    messagingSenderId: "147632368023",
    appId: "1:147632368023:web:85e466505e61e0280e3cd2",
    measurementId: "G-D2MXXVJ6GS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>

