# NativeScript ToDo App

## Blog
Please check more detail on our blog http://www.teclogiq.com/blog/nativescript-todo-application/

## Quick Start

To install NativeScript, run:

``` shell
npm install -g nativescript
```

##Execute the following command to create an app from this template:

``` shell
tns create TodoApp $ cd TodoApp
```
``` shell
tns platform add android 
```
``` shell
tns platform add ios (If you're not using a Mac, you cannot add and build for the iOS platform.) 
```

##Install the Necessary Native Plugins.

``` shell
tns plugin add nativescript-ui-sidedrawer 
```
``` shell
tns plugin add nativescript-ui-listview 
```
``` shell
tns plugin add nativescript-ui-dataform 
```
``` shell
tns plugin add nativescript-sqlite 
```

## Walkthrough

### Architecture

There are two components located in these folders:

- `/todo-list`
- `/todo-detail`

### Styling

This template is set up to use SASS for styling. All classes used are based on the {N} core theme – consult the [documentation](https://docs.nativescript.org/angular/ui/theme.html#theme) to understand how to customize it. Check it out to see what classes you can use on which component.

It has 4 global style files that are located at the root of the app folder:

- `_app-variables.scss` - holds the global SASS variables that are imported on each component's styles.
- `_app-common.scss` - the global common style sheet. These style rules are applied to both Android and iOS.
- `app.android.scss` - the global Android style sheet. These style rules are applied to Android only.
- `app.ios.scss` - the global iOS style sheet. These style rules are applied to iOS only.

##Running and Debugging the App

You can run the app on your device by executing:

``` shell
tns run 
```

and then the platform where you want to deploy. Here’s an example for android:

``` shell
tns run android 
```
