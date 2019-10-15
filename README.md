# mofron-comp-fdsplit
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

folding split component for mofron


# Install
```
npm install mofron mofron-comp-fdsplit
```

# Sample
```html
<require>
    <tag module="mofron-comp-fdsplit">Split</tag>
</require>

<Split ratio=(30,70)>
    <div baseColor="#faf5f5"></div>
    <div baseColor="#e6e6fa"></div>
</Split>
```
# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
| | switch | mofron-comp-switch | folding switch component |
| | folding | boolean | true: folding split component |
| | | | false: unfolding split component |
| | foldingEvent | function | event function |
| | | mixed | event parameter |
| | foldwid | string (size) | folding width |
| | width | string (size) | split width |
| | speed | number | folding speed |

