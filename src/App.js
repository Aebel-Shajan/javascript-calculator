import React, { useState } from "react";

let output = [];
const numberKeys = [
	{ text: "1", id: "one" },
	{ text: "2", id: "two" },
	{ text: "3", id: "three" },
	{ text: "4", id: "four" },
	{ text: "5", id: "five" },
	{ text: "6", id: "six" },
	{ text: "7", id: "seven" },
	{ text: "8", id: "eight" },
	{ text: "9", id: "nine" },
	{ text: "0", id: "zero", span: 2 },
	{ text: ".", id: "decimal" }
]
const operations = [
	{ text: "/", id: "divide" },
	{ text: "x", id: "multiply" },
	{ text: "-", id: "subtract" },
	{ text: "+", id: "add" }
]

function Key({ text, id, span = 1, vSpan = 1, onClick }) {
	const spanStyle = {
		gridColumn: "span " + span,
		gridRow: "span " + vSpan
	}
	return (
		<button
			type="button"
			className={"button"}
			id={id}
			style={spanStyle}
			onClick={() => onClick(text)}
		>
			{text}
		</button>
	)
}

function App() {
	const [currentType, setCurrentType] = useState("number");
	const [currentVal, setCurrentVal] = useState("0");
	const [expression, setExpression] = useState("");
	const [lastPressed, setLastPressed] = useState(null);

	const updateExpression = () => {
		setExpression(expression + currentVal);
		setCurrentVal("");
	}

	const handleAC = () => {
		setCurrentVal("0");
		setExpression("");
		setCurrentType("number");
	};


	const handleNumber = (number) => {
		if (lastPressed === "=") {
			setCurrentVal(prevVal => "")
		}

		if (number === ".") {
			if (!currentVal.includes(".") && /^-?\d+/.test(currentVal)) {
				setCurrentVal(currentVal => currentVal + ".");
			}
		} else {
			if (currentVal === "0") {
				setCurrentVal(number);
			} else {
				if (currentType === "operator") {
					setCurrentType("number");
					updateExpression();
					setCurrentVal(number);
				} else {
					setCurrentVal(currentVal => currentVal + number);
				}
			}
		}
		setLastPressed(number);
	};

const handleOperation = (operator) => {
		switch (currentType) {
			case "number":
				const enteringNewNumber = (expression === "" && currentVal === "0") || currentVal === "";
				const alreadyEnteredNumber = /^[-+]?(\d+[.])?\d+/.test(currentVal);
				const numberIsSign = currentVal === "+" || currentVal === "-";
				switch (true) {
					case enteringNewNumber:
						console.log("1");
						if (operator === "-" || operator === "+") {
							setCurrentVal(operator);
						}
						break;
					case numberIsSign:
						console.log("2");
						if (expression !== "") {
							setExpression(expression => expression.slice(0, -1));
							setCurrentType("operator");
							setCurrentVal(operator);
						}
						break;
					case alreadyEnteredNumber:
						console.log("3");
						setCurrentType("operator");
						updateExpression();
						setCurrentVal(operator);
						break;
					default:
						break;
				}
				break;
			case "operator":
				if (operator === "-") {
					updateExpression();
					setCurrentType("number");
					setCurrentVal("-");
				} else {
					setCurrentVal(operator);
				}
				break;
			default:
				break;
		}
		setLastPressed(operator);
	};


	const handleEquals = () => {
		if (expression && currentVal) {
			const newValue = evaluateExpression(expression + currentVal);
			setCurrentVal(newValue);
			output.push(expression + currentVal + "= " + newValue);
			setExpression("");
		}
		setLastPressed("=");
	};

	const evaluateExpression = (expr) => {
		let sanitizedExpr = expr.replace(/x/g, "*");
		sanitizedExpr = sanitizedExpr.replace(/--/g, "+");
		sanitizedExpr = sanitizedExpr.replace(/[+]-/g, "-");
		try {
			// eslint-disable-next-line no-eval
			return eval(sanitizedExpr).toString();

		} catch (error) {
			return "Error";
		}
	};

	const displayKeys = (keys, handleClick) => {
		return keys.map(element => (<Key key={element.id} onClick={handleClick} {...element} />))
	}

	return (
		<>
			<div id="calculator">
				<div id="display">
					{expression + currentVal}
				</div>
				<Key text="AC" id="clear" span={2} onClick={handleAC} />
				{displayKeys(operations, handleOperation)}
				<Key text="=" id="equals" vSpan={2} onClick={handleEquals} />
				<div id="numberKeys">
					{displayKeys(numberKeys, handleNumber)}
				</div>
			</div>
		</>
	);
}

export default App;