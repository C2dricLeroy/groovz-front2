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




### View-Model


### View

