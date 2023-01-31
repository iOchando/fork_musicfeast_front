export default () => {
  // set-properties =========================================================================================================//
  if (!HTMLElement.prototype.setProperty) {
    HTMLElement.prototype.setProperty = function(props) {
      if (typeof props !== "object") throw new Error("You must use object arrangement")
      for (const [keys, values] of Object.entries(props)) {
        this.style.setProperty(`--${keys}`, values)
      }
    }
  }
  // htmlElement.setProperty({keys, values})  <--- example


  // to-kedabcase =========================================================================================================//
  if (!String.prototype.toKedabCase) {
    String.prototype.toKedabCase = function() {
      return this && this
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');
    }
  }
  // string.toKedabCase() <-- example


  // to-snakecase =========================================================================================================//
  if (!String.prototype.toSnakeCase) {
    String.prototype.toSnakeCase = function() {
    return this && this
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('_');
    }
  }
  // string.toSnakeCase() <-- example


  // limitString =========================================================================================================//
  if (!String.prototype.limitString) {
    String.prototype.limitString = function(limit) {
      if (this.length > limit) return `${this.substring(0, limit)}...`
      return this
    }
  }
  // string.limitString(limit) <-- example


  // formatter =========================================================================================================//
  if (!Number.prototype.formatter) {
    Number.prototype.formatter = function() {
      if (Math.abs(this) > 999999999) {
        return Math.sign(this)*((Math.abs(this)/1000000000).toFixed(1)) + 'B'
      } else if (Math.abs(this) > 999999) {
        return Math.sign(this)*((Math.abs(this)/1000000).toFixed(1)) + 'M'
      } else if (Math.abs(this) > 999) {
        return Math.sign(this)*((Math.abs(this)/1000).toFixed(1)) + 'k'
      } else {
        return Math.sign(this)*Math.abs(this)
      }
    }
  }
  // formatter(number) <-- example


  // formatTime =========================================================================================================//
  if (!Number.prototype.formatTime) {
    Number.prototype.formatTime = function() {
      let minutes = Math.floor(this / 60);
      let seconds = this
      minutes = (minutes >= 10) ? minutes : "0" + minutes;
      seconds = Math.floor(seconds % 60);
      seconds = (seconds >= 10) ? seconds : "0" + seconds;
      return minutes + ":" + seconds;
    }
  }
  // formatTime() <-- example
}
