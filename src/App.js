
function Key({text, id, span=1, vSpan=1, handleClick}) {
	const spanStyle = {
		gridColumn: "span " + span,
		gridRow: "span " + vSpan
	}
	return (
			<button type="button" className={"button"} style={spanStyle} id={id}>
			{text}
		</button>
	)
}

function App() {
	const numberKeys = [
		{text: "1", id: "one"},
		{text: "2", id: "two"},
		{text: "3", id: "three"},
		{text: "4", id: "four"},
		{text: "5", id: "five"},
		{text: "6", id: "six"},
		{text: "7", id: "seven"},
		{text: "8", id: "eight"},
		{text: "9", id: "nine"},
		{text: "0", id: "zero", span: 2},
		{text: ".", id: "decimal"}
	]
	const operations = [
		{text: "/", id: "divide"},
		{text: "x", id: "multiply"},
		{text: "-", id: "minus"},
		{text: "+", id: "add"},
		{text: "=", id: "equals", vSpan: 2}
		
	]
	const displayKeys = (keys) => {
		return keys.map(element => (<Key key={element.id} {...element}/>))
	}
	
  return (
    <div id="calculator">
			<div id="display">
			</div>
			<Key text="AC" id="AC" span={2} />
			{displayKeys(operations)}
			<div id="numberKeys">
				{displayKeys(numberKeys)}
			</div>
    </div>
  );
}

export default App;
