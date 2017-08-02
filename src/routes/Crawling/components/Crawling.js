import React, {Component} from 'react'

export class Crawling extends Component {
  state = {
    term: this.props.location.query.term ? this.props.location.query.term : ''
  }

  componentDidMount() {
    this.props.getCrawling(this.state.term)
  }

  search = () => {
    this.props.router.push("/crawling?term="+this.state.term)
    this.props.getCrawling(this.state.term)
  }

  changeTerm = (event) => {
    this.setState({term: event.target.value})
  }

  render(){
    return (
      <div style={{ margin: '0 auto' }} >
        <div>
          <input type="text" value={this.state.term} onChange={this.changeTerm} disabled={this.props.data.loading} />
          <button onClick={this.search} disabled={this.props.data.loading}>
            {this.props.data.loading ? "조회중..." : "검색"}
          </button>
        </div>
        <p>{this.props.data.text}</p>
      </div>
    )
  }
}

export default Crawling
