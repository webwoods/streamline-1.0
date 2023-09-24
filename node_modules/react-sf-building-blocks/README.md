<img src="https://superflows-images.s3.ap-south-1.amazonaws.com/superflows_logo_gray_c2c.png" width="400"/>

# react-sf-building-blocks

> Basic building blocks of the Superflows component system

[![NPM](https://img.shields.io/npm/v/react-sf-themes.svg)](https://www.npmjs.com/package/react-sf-themes) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Node.js CI](https://github.com/superflows-dev/react-sf-themes/actions/workflows/node.js.yml/badge.svg)](https://github.com/superflows-dev/react-sf-themes/actions/workflows/node.js.yml)

## What's New

How To Implement A Customizable React NavBar With Built-in Routing

<a href="https://youtu.be/1C0fCp7yUKs"><img src="https://user-images.githubusercontent.com/108924653/209134511-7d5cc4f0-1fde-421a-839c-00bc7885bd6c.jpg" width="200"/></a>

## Documentation

<a href="http://superflows.dev/docs/category/building-blocks">Read The Docs 📖</a>

## Blog

<a href="http://blog.superflows.dev">Read 🖊</a>

## Video Tutorials on YouTube

<a href="https://www.youtube.com/channel/UCYNJLCE48yir4DsquciBuDw">Learn From Video Tutorials 📹</a>

## Discord Community

<a href="https://discord.com/channels/1018780901334863873/1018780901334863876">Start A Conversation 🗨</a>

## Tests

### How To Run

To run tests locally:

```bash
npm test
```

### Results

PASS src/index.test.tsx (457.308s)
  SfNav: Enable Routing: URL Detection
    ✓ SfNav: Home (4122ms)
    ✓ SfNav: Notif List (4067ms)
    ✓ SfNav: Notif Details (4089ms)
    ✓ SfNav: Menu (4078ms)
    ✓ SfNav: Sub Menu (4085ms)
    ✓ SfNav: Profile (4094ms)
    ✓ SfNav: Profile Sub Menu (4092ms)
  SfNav: Basic Render
    ✓ SfNav: Render Profile Portrait (26133ms)
    ✓ SfNav: Render Profile Landscape (4019ms)
    ✓ SfNav: Landscape Menus (28105ms)
    ✓ SfNav: Basic Render Landscape (4021ms)
    ✓ SfNav: Basic Render Potrait (6027ms)
    ✓ SfNav: Resize Check (6021ms)
    ✓ SfNav: Search / Sign In Portrait (14039ms)
    ✓ SfNav: Right Menu Click Portrait (8027ms)
    ✓ SfNav: Left Menu Click Portrait (26116ms)
    ✓ SfNav: Back Click Landscape (6018ms)
    ✓ SfNav: Back Click Portrait (6013ms)
  SfNav: Notifications
    ✓ SfNav: No unread notifications (4009ms)
    ✓ SfNav: Notification Landscape (6029ms)
    ✓ SfNav: Notification Landscape Icon (6026ms)
    ✓ SfNav: Notification Portrait (14085ms)
  SfNav: Banner
    ✓ SfNav: Banner Basic Render (4012ms)
    ✓ SfNav: Banner onBannerCtaPressed (4012ms)
    ✓ SfNav: Banner onBannerCtaPressed (4015ms)
    ✓ SfNav: Banner Custom Component (2008ms)
  SfNav: Routing
    ✓ SfNav: Enable Routing: Notification View All Clicked With Null Menu objects (8092ms)
    ✓ SfNav: Enable Routing: Notification Click With Null Menu objects (8077ms)
    ✓ SfNav: Enable Routing: Notification View All Clicked With Not Null Menu objects (8074ms)
    ✓ SfNav: Enable Routing: Notification Item Clicked With Null Menu objects (8099ms)
    ✓ SfNav: Enable Routing: Notification Item Clicked With Not Null Menu objects (8099ms)
    ✓ SfNav: Enable Routing: Menu click  (6054ms)
    ✓ SfNav: Enable Routing: Home click Menu Component Null (6070ms)
    ✓ SfNav: Enable Routing: Home Brand text click Menu Component Null (6076ms)
    ✓ SfNav: Enable Routing: Home click Menu Component Not Null (6081ms)
    ✓ SfNav: Enable Routing: Home Brand text click Menu Component Not Null (6039ms)
    ✓ SfNav: Enable Routing Landscape: Home click Menu Component Null (6131ms)
    ✓ SfNav: Enable Routing Landscape: Home Brand text click Menu Component Null (6096ms)
    ✓ SfNav: Enable Routing Landscape: Home click Menu Component Not Null (6093ms)
    ✓ SfNav: Enable Routing Landscape: Home Brand text click Menu Component Not Null (6039ms)
  SfInput
    ✓ SfInput: Basic Render Primary Date (4013ms)
    ✓ SfInput: Basic Render Primary Date > Prefill (2009ms)
    ✓ SfInput: Basic Render Primary Date > Prefill invalid date in feb (2009ms)
    ✓ SfInput: Basic Render Primary Date > Prefill invalid date in apr (2009ms)
    ✓ SfInput: Basic Render Primary Date > Prefill invalid date in apr (2008ms)
    ✓ SfInput: Basic Render Primary Date > Entry (20083ms)
    ✓ SfInput: Basic Render Primary DateOfBirth (2012ms)
    ✓ SfInput: Basic Render Primary DateOfBirth > Prefill (2008ms)
    ✓ SfInput: Basic Render Primary DateOfBirth > Prefill invalid date in feb (2008ms)
    ✓ SfInput: Basic Render Primary DateOfBirth > Prefill invalid date in apr (2008ms)
    ✓ SfInput: Basic Render Primary DateOfBirth > Prefill invalid date in apr (2009ms)
    ✓ SfInput: Basic Render Primary DateOfBirth > Entry (12276ms)
    ✓ SfInput: Basic Render Primary DateOfBirth > Entry > Invalid M = 2 D > 29 (12261ms)
    ✓ SfInput: Basic Render Primary DateOfBirth > Entry > Invalid M = 2 D > 29 (8263ms)
    ✓ SfInput: Basic Render Primary DateOfBirth > Entry > Invalid M = 4 D > 30 (8256ms)
    ✓ SfInput: Basic Render Primary DateOfBirth > Entry > Invalid M = 4 D < 30 (8260ms)
    ✓ SfInput: Basic Render Primary Mobile (206ms)
    ✓ SfInput: Basic Render Primary Mobile > prefill (2207ms)
    ✓ SfInput: Basic Render Primary Mobile > select ISD (6275ms)
    ✓ SfInput: Basic Render Primary Mobile > select ISD > corner cases (8394ms)
    ✓ SfInput: Basic Render Primary Mobile > select ISD > correct mobile (12481ms)
    ✓ SfInput: Basic Render Primary Mobile > country code button cases (8226ms)
    ✓ SfInput: Basic Render Primary Email (206ms)
    ✓ SfInput: Basic Render Primary Email > correct value entered > enter pressed (4310ms)
    ✓ SfInput: Basic Render Primary Name (206ms)
    ✓ SfInput: Basic Render Primary Name Night Mode (206ms)
    ✓ SfInput: Basic Render Primary Name > correct value entered (4276ms)
    ✓ SfInput: Basic Render Primary Name > correct value entered > enter pressed (2267ms)
    ✓ SfInput: Basic Render Primary Name > test onclick (2269ms)
  SfButton
    ✓ SfButton: Basic Render Primary Filled (204ms)
    ✓ SfButton: Basic Render Secondary Filled (203ms)
    ✓ SfButton: Basic Render Danger Filled (205ms)
    ✓ SfButton: Basic Render Warning Filled (211ms)
    ✓ SfButton: Basic Render Success Filled (205ms)
    ✓ SfButton: Basic Render Info Filled (204ms)
    ✓ SfButton: Basic Render Dark Filled (206ms)
    ✓ SfButton: Basic Render Light Filled (203ms)
    ✓ SfButton: Basic Render Primary Outlined (204ms)
    ✓ SfButton: Basic Render Secondary Outlined (203ms)
    ✓ SfButton: Basic Render Danger Outlined (204ms)
    ✓ SfButton: Basic Render Warning Outlined (203ms)
    ✓ SfButton: Basic Render Success Outlined (206ms)
    ✓ SfButton: Basic Render Info Outlined (205ms)
    ✓ SfButton: Basic Render Dark Outlined (206ms)
    ✓ SfButton: Basic Render Light Outlined (204ms)
    ✓ SfButton: Basic Render Light Outlined (204ms)
    ✓ SfButton: Color inversion mouseevents (2307ms)
    ✓ SfButton: Color inversion mouseevents (2311ms)
    ✓ SfButton: onClick (308ms)

------------------------------------|----------|----------|----------|----------|-------------------|
File                                |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
------------------------------------|----------|----------|----------|----------|-------------------|
All files                           |    99.38 |    80.59 |    93.63 |    99.83 |                   |
 Constants.tsx                      |      100 |      100 |      100 |      100 |                   |
 Services.js                        |      100 |      100 |      100 |      100 |                   |
 SfButton.tsx                       |      100 |    68.97 |      100 |      100 |... 39,40,41,76,98 |
 SfInput.tsx                        |      100 |    78.22 |       98 |      100 |... 88,689,719,720 |
 SfNav.tsx                          |      100 |    81.88 |    90.12 |      100 |... ,955,1098,1099 |
 Util.tsx                           |      100 |    83.63 |      100 |      100 |... 48,254,257,260 |
 index.tsx                          |        0 |        0 |        0 |        0 |                   |
------------------------------------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       89 passed, 89 total
Snapshots:   0 total
Time:        459.596s
Ran all test suites.

<br />


## License

MIT © [superflows-dev](https://github.com/superflows-dev)
