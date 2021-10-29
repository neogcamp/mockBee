const prompts = require("prompts");

function prompt(questions, { nonInteractiveHelp, ...options } = {}) {
  questions = Array.isArray(questions) ? questions : [questions];
  return prompts(questions, {
    onCancel() {
      throw new Error();
    },
    ...options,
  });
}

prompt.separator = (title) => ({
  title,
  disabled: true,
  value: undefined,
});

async function selectAsync(questions, options) {
  const { value } = await prompt(
    {
      limit: 11,
      ...questions,
      onRender() {
        if (this.firstRender) {
          // Ensure the initial state isn't on a disabled item.
          while (this.choices[this.cursor].disabled) {
            this.cursor++;
            if (this.cursor > this.choices.length - 1) break;
          }
          this.fire();
          // Without this, the value will be `0` instead of a string.
          this.value = (this.choices[this.cursor] || {}).value;

          // Support up arrow and `k` key -- no looping
          this.up = () => {
            let next = this.cursor;
            while (true) {
              if (next <= 0) break;
              next--;
              if (!this.choices[next].disabled) break;
            }
            if (!this.choices[next].disabled && next !== this.cursor) {
              this.moveCursor(next);
              this.render();
            } else {
              this.bell();
            }
          };

          // Support down arrow and `j` key -- no looping
          this.down = () => {
            let next = this.cursor;
            while (true) {
              if (next >= this.choices.length - 1) break;
              next++;
              if (!this.choices[next].disabled) break;
            }
            if (!this.choices[next].disabled && next !== this.cursor) {
              this.moveCursor(next);
              this.render();
            } else {
              this.bell();
            }
          };

          // Support tab -- looping
          this.next = () => {
            let next = this.cursor;
            let i = 0;
            while (i < this.choices.length) {
              i++;
              next = (next + 1) % this.choices.length;
              if (!this.choices[next].disabled) break;
            }
            if (!this.choices[next].disabled) {
              this.moveCursor(next);
              this.render();
            } else {
              // unexpected
              this.bell();
            }
          };
        }
      },
      name: "value",
      type: "select",
    },
    options
  );
  return value ?? null;
}
module.exports = { prompt, selectAsync };
