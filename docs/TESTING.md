# Groovz Testing Documentation

This document describes how to un tests for Groovz Front and provides an overview of the testing strategies used in this project. 

## Coverage review

## Overview

At Groovz, we believe in the importance of testing to maintain the quality of our code, ensure its proper functioning, and prevent regressions. We use the following types of tests:

## Running Tests
### Prerequisites
Before you can run tests, you need to:
- Install Node.js & NPM
- Install project Dependencies
- Set up Environment Variables

Once these prerequisites are met, you should be ready to run your tests.

### Running All Tests
To run all tests, use the following command: ```npm run test```

### Running a Subset of Tests
To run a specific test or subset of tests, use the following command: ```npx jest -t "name"```

## Test Suites
Groovz is divided into several test suites. Each test suite is responsible for testing a specific part of the application. The following sections describe each test suite:

___

## Unit Tests Scenarios
### Model
#### Post
**sharePlaylist**
- Scenario 1 : Test that the function successfully shares a playlist by making a correct POST request. This test should return response data from the API
- Scenario 2 : Test the scenario where the XSRF token is missing or unavailable. This test should return an error with message 'xsrfToken is not available'.
- Scenario 3 : Test the scenario where the API request fails. This test should return an error.
- Scenario 4 : Test that the function sends the correct headers and payload to the API.
- Scenario 5 : Test how the function handles unexpected errors.
- Scenario 6 : Test the function with invalid text input. This should return an error.

**getPosts**
- Scenario 1 : Test successfully retrieval of posts. This test should return response data from the API.
- Scenario 2 : Test with invalid or missing XSRF. This test should return an error with message 'xsrfToken is not available'.
- Scenario 3 : Test with invalid or missing userID. This test should return an error "failed to get userId".
- Scenario 4 : Test with response failure. This test should return an error with the error message. 

**getOtherPosts**
- Scenario 1 : Test successfully retrieval of posts. This test should return response data from the API.
- Scenario 2 : Test with invalid or missing XSRF. This test should return an error with message 'xsrfToken is not available'.
- Scenario 3 : Test with invalid or missing userID. This test should return an error "failed to get userId".
- Scenario 4 : Test with response failure. This test should return an error with the error message.

#### User 
**getToken**
- Scenario 1 : Test successful retrieval of the xsrf token from localStorage. This test should return the value of the xsrf token.
- Scenario 2 : Test with an error while accessing xsrf token. This test should return null and log error message in the console.

**getUserId**
- Scenario 1 : Test successful retrieval of the userId from localStorage. This test should return the value of the userId.
- Scenario 2 : Test with an error while accessing userId. This test should return null and log error message in the console.

**getUserName**
- Scenario 1 : Test successful retrieval of userName. This test should return the response data from the API. 
- Scenario 2 : Test when the userId is null or undefined. This test should return an error message. 
- Scenario 3 : Test with missing or invalid xsrf token. This test should return an error.
- Scenario 4 : Test with response failure from the servor. This test should return an error. 

**getFollows**
- Scenario 1 : Test successful retrieval of the follows. This test should return the response data from the API. 
- Scenario 2 : Test with missing or invalid xsrf token. This test should return an error. 
- Scenario 3 : Test with response failure from the server. This test should return an error. 

**getFollowers**
- Scenario 1 : Test successful retrieval of the followers. This test should return the response data from the API.
- Scenario 2 : Test with missing or invalid xsrf token. This test should return an error.
- Scenario 3 : Test with response failure from the server. This test should return an error.

**getUserNameById**
- Scenario 1 : Test successful retrieval of the userName. This test should return response data from the API.
- Scenario 2 : Test when the userId is null or undefined. This test should return an error.
- Scenario 3 : Test when missing xsrf token. This test should return an error. 
- Scenario 4 : Test with response failure from the servor. This should return an error. 

**getFollowersById**
- Scenario 1 : Test successful retrieval of the followers. This test should return the response data from the API.
- Scenario 2 : Test with missing or invalid xsrf token. This test should return an error.
- Scenario 3 : Test with response failure from the server. This test should return an error.

**getFollowById**
- Scenario 1 : Test successful retrieval of the follows. This test should return the response data from the API.
- Scenario 2 : Test with missing or invalid xsrf token. This test should return an error.
- Scenario 3 : Test with response failure from the server. This test should return an error.

**updateName**
- Scenario 1 : Test successful update of the name. This should return the updated name.
- Scenario 2 : Test with missing xsrf token. This test should return an error.
- Scenario 3 : Test with missing userId. This test should return an error. 
- Scenario 4 : Test with an empty userName. This test should handle the error and return a message to the user.
- Scenario 5 : Test with response failure from the server. This should return an error. 

**searchUsers**
- Scenario 1 : Test successful search. This test should return an array with the users found.
- Scenario 2 : Test successful search with matching no users. This test should return an empty array.
- Scenario 3 : Test with missing XSRF token. This test should return an error.
- Scenario 4 : Test with empty or missing search term. This test should return a message to the user.
- Scenario 5 : Test with response failure from the server. This test should return an error.
- Scenario 6 : Test with missing userId. This test should return an error. 
- Scenario 7 : Test that the current user is excluded from the results. This test should verify that the current user's id is properly excluded from the result array. 

#### UserFollow

**isUserFollowed**
- Scenario 1 : Test successful check when the user is followed. This test should return true.
- Scenario 2 : Test successful check when the user is not followed. This test should return false.
- Scenario 3 : Test when missing xsrf token. This test should return an error.
- Scenario 4 : Test with missing userId. This test should return an error.
- Scenario 5 : Test with response failure from the server. This test should return an error. 

**follow**
- Scenario 1 : Test successful follow of another user. This test should return response data from the API.
- Scenario 2 : Test with missing xsrf token. This test should return an error.
- Scenario 3 : Test with missing userId. This test should return an error.
- Scenario 4 : Test with response failure from the server. Ths test should return an error. 

**unfollow** 
- Scenario 1 : Test successfull unfollowing of another user. This test should return response data from the API
- Scenario 2 : Test with missing xsrf token. This test should return an error.
- Scenario 3 : Test with missing userId. This test should return an error.
- Scenario 4 : Test with response failure from the server. Ths test should return an error.

#### Customer 

**getPlaylists**
- Scenario 1 : Test successful retrieval of playlists. This test should return response data from the API.
- Scenario 2 : Test with missing or invalid Spotify ID. This test should return an error.
- Scenario 3 : Test with failure of the axios.createInstance. This test should return an error.
- Scenario 4 : Test with response failure from the server. This test should return the servor error.
- Scenario 5 : Test with a user who has no playlists. This test should return ???

**getFollowedArtists**
- Scenario 1 : Test successful retrieval of followed artists. This test should return response data from the API.
- Scenario 2 : Test with missing or invalid Spotify ID. This test should return an error.
- Scenario 3 : Test with failure of the axios.createInstance. This test should return an error.
- Scenario 4 : Test with response failure from the server. This test should return the servor error.

**getRecommendations**
- Scenario 1 : Test successful retrieval or recommandations. This test should return the response data from the API.
- Scenario 2 : Test with no followed artists. This test should return ???
- Scenario 3 : Test with failure in creating the axios Instance. This test should return an error
- Scenario 4 : Test with response failure from the spotify API. This test should return an error.
- Scenario 5 : Test the logic of selecting a random artist from the followed artists. 

**getFollowedUsers**
- Scenario 1 : Test successful retrieval of followed followedUsers. This test should return response data from the API.
- Scenario 2 : Test with missing or invalid Spotify ID. This test should return an error.
- Scenario 3 : Test with failure of the axios.createInstance. This test should return an error.
- Scenario 4 : Test with response failure from the server. This test should return the servor error.
- 
#### Spotify

**getToken**
- Scenario 1 : Test successful retrieval of Spotify tokens. This test should return response data from the API.
- Scenario 2 : Test with missing user ID. This test should return an error.
- Scenario 3 : Test with missing xsrf token. This test should return an error.
- Scenario 4 : Test with response failure from the server. This test should return the appropriate error.
- Scenario 5 : Test the case the server response does'nt include spotifyacessToken and spotifyrefreshToken.

**createAxiosInstance**
- Scenario 1 : Test successful creation oof axios instance. This test should return an axio instance.
- Scenario 2 : Test with missing user ID. This test should return an error. 
- Scenario 3 : Test with missing spotify ID. This test should return an error.
- Scenario 4 : Test interceptor for 401 responses. This test should refresh the token and retries the original request.
- Scenario 5 : Test the response interceptor for non-401 responses. This test should return appropriate errors.
- Scenario 6 : Test the behavior when the token refresh failes. This test should return an error.

**getSpotifyId**
- Scenario 1 : Test successful retrieval of the Spotify user ID. This test should return the response data from the API.
- Scenario 2 : Test with error response from spotify API. This test should return the error.
- Scenario 3 : Test the behavior when invalid ID type (refactor then delete with scenario)

**getPlaylistById**
- Scenario 1 : Test successful retrieval of a playlist. This test should return the response data from the API.
- Scenario 2 : Test with missing playlist ID. This function should return an error.

### View-Model

#### PostCreationViewModel
- Scenario 1: Test initial state of the view model. This test should assert that the initial state is correct (e.g., playlists are empty, loading is true).
- Scenario 2: Test successful fetching of playlists. This test should simulate the fetching of playlists and assert that the playlists are set correctly.
- Scenario 3: Test setting the selected playlist when playlists are fetched. This test should assert that the first playlist is selected if there are playlists.
- Scenario 4: Test the loading state when fetching playlists. This test should assert that loading is set to false after playlists are fetched.
- Scenario 5: Test submitting a playlist share. This test should simulate a form submission and assert that the sharePlaylist method of the Post model is called with the correct parameters.
- Scenario 6: Test updating the comment. This test should simulate typing a comment and assert that the comment state is updated correctly.
- Scenario 7: Test selecting a playlist. This test should simulate selecting a playlist from the list and assert that the selected playlist state is updated correctly.
- Scenario 8: Test error handling when fetching playlists fails. This test should simulate an error when fetching playlists and assert that the error is handled correctly (if applicable to your implementation).

#### PostViewModel
- Scenario 1: Test the initial state of the view model. This test should assert that the initial state of posts, visiblePosts, loadedPostsCount, and comment is set correctly.
- Scenario 2: Test successful fetching of posts, including playlists. This test should simulate the fetching of posts and assert that the posts are set correctly, including associated playlists.
- Scenario 3: Test the "Load More" functionality. This test should simulate clicking the load more button and assert that the posts are fetched correctly and the state variables visiblePosts and loadedPostsCount are updated.
- Scenario 4: Test the comment submission handler when comments are not available. This test should simulate submitting a comment and assert that the appropriate alert or log message is shown.
- Scenario 5: Test the comment change handler. This test should simulate typing a comment and assert that the comment state is updated correctly.
- Scenario 6: Test the date formatting function. This test should call the formatDate function with various date objects and assert that the formatted date strings are returned correctly.
- Scenario 7: Test error handling when fetching posts fails (if applicable to your implementation). This test should simulate an error when fetching posts and assert that the error is handled correctly.
- Scenario 8: Test error handling when fetching playlists fails (if applicable to your implementation). This test should simulate an error when fetching playlists and assert that the error is handled correctly.

#### RecommendationViewModel
- Scenario 1: Test the initial state of the view model. This test should assert that the initial state of newRecommendations and loading is set correctly.
- Scenario 2: Test successful fetching of recommendations. This test should simulate the fetching of recommendations and assert that the newRecommendations are set correctly and the loading state is set to false.
- Scenario 3: Test the loading state during the fetching process. This test should assert that the loading state is set to true during the fetching process and then set to false when the fetching is complete.
- Scenario 4: Test error handling when fetching recommendations fails. This test should simulate an error when fetching recommendations, assert that the error is logged correctly, and verify that the loading state is set to false.
- Scenario 5: Test the scenario where no recommendations are returned. This test should simulate a situation where the fetching of recommendations returns an empty array, and assert that the newRecommendations state is set to an empty array and the loading state is set to false.

#### searchViewModel
- Scenario 1: Test the initial state of the view model. This test should assert that the initial states of searchTerm, isSearchDone, and searchResults are set correctly.
- Scenario 2: Test the handleInputChange function with valid input. This test should simulate a change in the input element and assert that the searchTerm state is updated correctly.
- Scenario 3: Test the handleSearch function with a valid search term. This test should simulate a search with a valid term, mock the User.searchUsers function to return expected results, and assert that isSearchDone is set to true and searchResults is set correctly.
- Scenario 4: Test the handleSearch function with an empty search term. This test should simulate a search with an empty term and assert that isSearchDone is set to true and searchResults remains an empty array.
- Scenario 5: Test the handleSearch function with an error during the search. This test should simulate an error during the search process, mock the User.searchUsers function to throw an error, and assert that the error is logged correctly.
- Scenario 6: Test the handleSearch function with whitespace search term. This test should simulate a search with only whitespace, and assert that isSearchDone is set to true and searchResults remains an empty array.

#### FeedNavViewModel

- Scenario 1: Test the initialization of the view model. This test should assert that the router object is correctly obtained from useRouter and that the signOut function is defined.
- Scenario 2: Test the signOut function with successful sign out. This test should simulate a sign-out action, mock localStorage.removeItem and router.push to behave as expected, and assert that the user token is removed from local storage and the user is redirected to the home page.
- Scenario 3: Test the signOut function with an error during the sign-out process. This test should simulate a sign-out action, mock localStorage.removeItem or router.push to throw an error, and assert that the error is logged correctly.

#### signinViewModel
- Scenario 1: Test the initialization of the view model. This test should assert that the initial states for password, email, error, and showPassword are correctly set, and the functions like setEmail, setPassword, setShowPassword, and signinSubmit are defined.
- Scenario 2: Test the signinSubmit function with a successful sign-in. This test should simulate a sign-in action with valid email and password, mock the axios post request to return a successful response with xsrfToken and userId, and assert that these tokens are stored in local storage and the user is redirected to the feed page.
- Scenario 3: Test the signinSubmit function with a missing xsrfToken in the response. This test should simulate a sign-in action and mock the axios post request to return a response without xsrfToken, then assert that the correct error message is logged.
- Scenario 4: Test the signinSubmit function with an invalid email or password. This test should simulate a sign-in action with an incorrect email or password, mock the axios post request to return a 400 status error, and assert that the error state is updated with the correct error message.
- Scenario 5: Test the signinSubmit function with an unexpected error during the sign-in process. This test should simulate a sign-in action, mock the axios post request to throw an unexpected error, and assert that the error is logged correctly.

#### PlaylistListViewModel
- Scenario 1: Test the initialization of the view model. This test should assert that the initial states for playlists, loading, scrollIndex, itemsToShow are correctly set, and the functions like scrollLeft, scrollRight are defined.
- Scenario 2: Test the successful retrieval of playlists. This test should mock the Customer.getPlaylists function to return a successful response and assert that the playlists state is updated and loading is set to false.
- Scenario 3: Test the handling of different window sizes. This test should simulate different window sizes and assert that the itemsToShow state is correctly set according to the window size.
- Scenario 4: Test the scrollRight function. This test should simulate a scroll right action and assert that the scrollIndex state is incremented by 1 if not exceeding the limit.
- Scenario 5: Test the scrollLeft function. This test should simulate a scroll left action and assert that the scrollIndex state is decremented by 1 if greater than 0.
- Scenario 6: Test the resize event listener. This test should simulate the window resize event and assert that the handleResize function is called and the itemsToShow state is updated correctly.
- Scenario 7: Test the component unmounting behavior. This test should simulate the unmounting of the component and assert that the resize event listener is removed.

#### ProfileViewModel
- Scenario 1: Test the initialization of the view model. This test should assert that the initial states for user, showModal, newName are correctly set, and the functions like handleUpdateName, handleOpenModal, etc. are defined.
- Scenario 2: Test the successful retrieval of user information. This test should mock the User.getUserName, User.getFollows, and User.getFollowers functions to return successful responses and assert that the user state is correctly populated.
- Scenario 3: Test the opening of the modal with a warning alert. This test should call handleOpenModal and assert that an alert is shown with the correct warning message and showModal state is set to true.
- Scenario 4: Test the handle name change. This test should call handleNameChange with a new name and assert that the newName state is updated correctly.
- Scenario 5: Test the handle update name with a valid new name. This test should call handleUpdateName with a valid new name, mock the User.updateName function, and assert that the user's name is updated and the modal is closed.
- Scenario 6: Test the handle update name with an empty new name. This test should call handleUpdateName with an empty new name and assert that an alert is shown with the correct error message.
- Scenario 7: Test the handle close modal. This test should call handleCloseModal and assert that the showModal state is set to false.
- Scenario 8: Test the useEffect that fetches user data. This test should simulate the mounting of the component and assert that the fetchUser function is called and the user state is populated correctly.

#### RecentlyFollowedViewModel
Scenario 1: Test the initialization of the view model. This test should assert that the initial states for artists, loading, scrollIndex, itemsToShow are correctly set, and the functions like scrollRight, scrollLeft, etc. are defined.
Scenario 2: Test the successful retrieval of recently followed artists. This test should mock the Customer.getFollowedArtists function to return successful responses and assert that the artists state is correctly populated, and the loading state is set to false.
Scenario 3: Test the scroll right functionality when there are more items to show. This test should set the initial scrollIndex and itemsToShow, call scrollRight, and assert that the scrollIndex is incremented by 1.
Scenario 4: Test the scroll right functionality when there are no more items to show. This test should set the initial scrollIndex equal to artists.length - itemsToShow, call scrollRight, and assert that the scrollIndex remains the same.
Scenario 5: Test the scroll left functionality when the scrollIndex is greater than 0. This test should set the initial scrollIndex, call scrollLeft, and assert that the scrollIndex is decremented by 1.
Scenario 6: Test the scroll left functionality when the scrollIndex is 0. This test should set the initial scrollIndex to 0, call scrollLeft, and assert that the scrollIndex remains the same.
Scenario 7: Test the handle resize functionality for various screen sizes. This test should call the internal handleResize function for different screen widths and assert that the itemsToShow state is set correctly according to the given conditions.
Scenario 8: Test the useEffect that fetches recently followed artists and handles resizing. This test should simulate the mounting of the component, mock the Customer.getFollowedArtists function, and assert that the fetchArtists function is called, the artists state is populated correctly, and the resize event listener is added and removed.

#### userProfileViewModel
- Scenario 1: Test the initialization of the view model with a given user ID. This test should assert that the initial states for user, isFollowing are correctly set, and the function toggleFollow is defined.
- Scenario 2: Test successful retrieval of user profile information. This test should mock the User.getUserNameById, User.getFollowsById, User.getFollowersById, and UserFollow.isUserFollowed functions to return successful responses and assert that the user and isFollowing states are correctly populated.
- Scenario 3: Test the toggle follow functionality when the user is already following. This test should set the initial isFollowing state to true, call toggleFollow, and assert that the UserFollow.unfollow function is called and the isFollowing state is set to false.
- Scenario 4: Test the toggle follow functionality when the user is not following. This test should set the initial isFollowing state to false, call toggleFollow, and assert that the UserFollow.follow function is called and the isFollowing state is set to true.
- Scenario 5: Test the useEffect that fetches user profile information. This test should simulate the mounting of the component with a given user ID, mock the relevant functions in the User and UserFollow models, and assert that the fetchUser function is called, and the user and isFollowing states are populated correctly.
- Scenario 6: Test the behavior when the userId prop changes. This test should simulate a change in the userId prop and assert that the fetchUser function is called again with the updated user ID, and the states are updated accordingly.

#### SignupViewModel
- Scenario 1: Test the initial state of the view model. This test should verify that all states are initialized correctly, including username, password, email, showPassword, emailError, and passwordError.
- Scenario 2: Test the email validation functionality with a valid email. This test should call validateEmail with a valid email address and assert that emailError is set to false.
- Scenario 3: Test the email validation functionality with an invalid email. This test should call validateEmail with an invalid email address and assert that emailError is set to true.
- Scenario 4: Test the password validation functionality with a valid password. This test should call validatePassword with a valid password (length >= 8) and assert that passwordError is set to false.
- Scenario 5: Test the password validation functionality with an invalid password. This test should call validatePassword with an invalid password (length < 8) and assert that passwordError is set to true.
- Scenario 6: Test the signup submission with valid input. This test should mock the axios post request to return a successful response, set valid email and password values, call signupSubmit, and assert that the router pushes to the login page.
- Scenario 7: Test the signup submission with invalid email. This test should set an invalid email, call signupSubmit, and assert that the axios post request is not called, and emailError is set to true.
- Scenario 8: Test the signup submission with an invalid password. This test should set an invalid password, call signupSubmit, and assert that the axios post request is not called, and passwordError is set to true.
- Scenario 9: Test the signup submission with an error response from the server. This test should mock the axios post request to return an error, call signupSubmit, and assert that the appropriate error handling is executed (e.g., console error).
- Scenario 10: Test the functionality of showing and hiding the password. This test should call setShowPassword with different boolean values and assert that the showPassword state is updated accordingly.

#### SpotifyLoginViewModel
- Scenario 1: Test the correct redirection URL formation. This test should call handleLogin and assert that the constructed URL includes the correct client_id, redirect_uri, and scope, and that it redirects the user to the correct Spotify authorization URL.
- Scenario 2: Test the behavior when xsrfToken is available and the userId is retrieved. This test should mock User.getToken and User.getUserId to return valid values, call handleLogin, and verify that the axios get request is called with the correct headers and URL.
- Scenario 3: Test the behavior when xsrfToken is not available. This test should mock User.getToken to return null, call handleLogin, and verify that the axios get request is not called.
- Scenario 4: Test the behavior when the client_id environment variable is not defined. This test should set client_id to null, call handleLogin, and assert that an error is thrown with the correct message.
- Scenario 5: Test the state generation part by ensuring that the response from the server is used as the state parameter in the constructed URL.
- Scenario 6: Test the behavior when the axios get request for generating the state fails. This test should mock the axios get request to return an error, call handleLogin, and assert that the appropriate error handling is executed (e.g., an error is logged or thrown).

___

## integration tests scenarios

- 

