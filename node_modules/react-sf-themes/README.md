# react-sf-themes

> This packages contains the global Superflows configuration including the default UI theme.

[![NPM](https://img.shields.io/npm/v/react-sf-themes.svg)](https://www.npmjs.com/package/react-sf-themes) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Node.js CI](https://github.com/superflows-dev/react-sf-themes/actions/workflows/node.js.yml/badge.svg)](https://github.com/superflows-dev/react-sf-themes/actions/workflows/node.js.yml)

<br />

## Documentation

<a href="https://superflows.dev/docs/customize">Read 📖</a>

<br />

## On This Page

- [Introduction](#introduction)
- [How It Works](#how-it-works)
- [Theme](#theme)
- [Quickstart](#quickstart)
- [Customization](#customization)
- [Tests](#tests)

<br />

## Introduction

Use the react-sf-themes package to access the global configuration and the default theme provided by Superflows. If needed you can customize it as you want by changing the default values to suit your UI.

<br />

## How It Works

Customization works as follows:
- Access the default configuration and theme values using this package
- Modify them as per your requirement
- Pass the modified object to your Superflows components

<br />

## Theme

This package provides default values for:
- Variants
- Types
- Colors
- Spaces
- Dimensions
- Modes
- InputTypes
- Breakpoints

### Variants

Superflows provides the following variants: 
- Primary
- Secondary
- Danger
- Success
- Warning
- Info
- Light
- Dark

### Types

Types are as followed:
- Filled
- Outlined

### Colors

Following colors are provided:

| Variant      | Background Color  | Text Color         |
|--------------|-------------------|--------------------|
| Primary      | #0d6efd           | #ffffff            |
| Secondary    | #6c757d           | #ffffff            |
| Danger       | #dc3545           | #ffffff            |
| Success      | #198754           | #ffffff            |
| Warning      | #ffc107           | #000000            |
| Info         | #0dcaf0           | #000000            |
| Light        | #f8f9fa           | #000000            |
| Dark         | #212529           | #ffffff            |

### Spaces

Spaces are dimensions, which are intended to be used for spacings, paddings, margins, etc.

| Space      | Value  
|------------|-------------------
| min        | 5
| ltl        | 10
| mod        | 15
| big        | 20
| lrg        | 25
| xlg        | 30
| max        | 35

### Dimensions

Dimensions are default dimensions for certain Superflows components

| Dimension                 | Value  
|---------------------------|-------------------
| navHeight                 | 60
| navBannerHeight           | 30
| menuWidth                 | 120
| notificationListWidth     | 200
| notificationListMaxWidth  | 200

### Modes

Modes are:

| Mode       | Value  
|------------|-------------------
| Day        | day
| Night      | night

### InputTypes

Input types are types of input accepted from the users in the input field.

| InputType       | Value  
|-----------------|-------------------
| Name            | name
| Email           | email
| Mobile          | mobile
| Date            | date
| DateOfBirth     | dateOfBirth
| Gender          | gender

### Breakpoints

Breakpoints are widths, that are used in responsive design.

| Breakpoint      | Value  
|-----------------|-------------------
| mobile          | 480
| tablet          | 768
| laptop          | 1024
| desktop         | 1200


<br />

## Quickstart

### Installation

```bash
npm install --save react-sf-themes
```

### Usage

```tsx
import React from 'react'
import Themes from 'react-sf-themes'

const App = () => {

  console.log('Themes', Themes.getTheme());

  return <div></div>
}

export default App

```

<br />

## Tests

### How To Run

To run tests locally:

```bash
npm test
```

### Results

PASS src/index.test.tsx
- Themes
  - ✓ Render (3ms)

-----------|----------|----------|----------|----------|-------------------|
File       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------|----------|----------|----------|----------|-------------------|
All files  |      100 |      100 |      100 |      100 |                   |
 index.tsx |      100 |      100 |      100 |      100 |                   |
-----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.445s

<br />

## License

MIT © [superflows-dev](https://github.com/superflows-dev)
