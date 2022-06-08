/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

// 1. 숫자를 누르면 누른 숫자가 출력되어야 합니다. (완료!)
// 2. 숫자를 연속해서 누르면 숫자가 더해져서 출력되어야 합니다. (완료!)
// 3. 숫자와 연산자를 입력한 후 = 를 클릭하면 계산 결과가 출력되어야 합니다.
// 4. 연속해서 숫자와 연산자를 입력하면 중간에 계산 결과가 출력되어야 합니다.

function render(result = 0) {
  let numOne = null;
  let operator = '';
  let numTwo = null;

  // 연산자 클릭시
  const onClickOperator = (op) => {
    operator = op;
  };

  // 숫자 클릭시
  const onClickNumber = (number) => {
    // 수 연속적으로 나타내기
    const newResult = result * 10 + number;
    render(newResult);

    // 진행중!
    if (operator) {
      // 연산자가 있으면 숫자2에 저장 (아직 진행중)
      numOne = number;
    } else {
      // 연산자가 없으면 숫자2에 저장  (아직 진행중)
      numTwo = number;
    }
  };

  console.log(operator, numOne, numTwo);

  // '=' 선택시 마지막 결과값 도출
  const onClickEquals = () => {
    if (operator === '+') {
      render(numOne + numTwo);
    } else if (operator === '-') {
      render(numOne - numTwo);
    } else if (operator === '*') {
      render(numOne * numTwo);
    } else if (operator === '/') {
      render(numOne / numTwo);
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{result}</p>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={() => {
              onClickNumber(i);
            }}
          >
            {i}
          </button>
        ))}
        <div />
      </div>
      <div>
        {['+', '-', '*', '/'].map((i) => (
          <button type="button" onClick={() => { onClickOperator(i); }}>{i}</button>
        ))}
        <button type="button" onClick={onClickEquals}>=</button>
      </div>

    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
