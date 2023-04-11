import {Component} from 'react'

import Loader from 'react-loader-spinner'

import ProjectItem from '../ProjectItem'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class Projects extends Component {
  state = {
    projectsList: [],
    optionId: categoriesList[0].id,
    isLoading: true,
    isSuccess: false,
    isFailure: false,
  }

  componentDidMount() {
    this.getProjectsData()
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value}, () => this.getProjectsData())
    // this.setState({optionId: event.target.value})
    // console.log(event.target.value)
    // this.getProjectsData()
  }

  getProjectsData = async () => {
    const {optionId} = this.state

    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${optionId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()

      const formattedData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))

      this.setState({
        projectsList: formattedData,
        isLoading: false,
        isSuccess: true,
        isFailure: false,
      })
    } else {
      //   console.log(data)
      this.setState({isLoading: false, isFailure: true, isSuccess: false})
    }
  }

  onClickRetry = () => {
    this.getProjectsData()
  }

  render() {
    const {optionId, projectsList, isLoading, isSuccess, isFailure} = this.state

    return (
      <div className="bg-container">
        <div className="nav">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="logo"
          />
        </div>
        <select
          className="input"
          onChange={this.onChangeOptionId}
          value={optionId}
        >
          {categoriesList.map(each => (
            <option key={each.id} value={each.id}>
              {each.displayText}
            </option>
          ))}
        </select>
        {isLoading && (
          <div data-testid="loader">
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={50}
              width={50}
              testid="loader"
            />
          </div>
        )}
        {isSuccess && (
          <ul>
            {projectsList.map(item => (
              <ProjectItem data={item} key={item.id} />
            ))}
          </ul>
        )}
        {isFailure && (
          <div className="failure-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
              alt="failure view"
              className="fail-img"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for.</p>
            <button type="button" onClick={this.onClickRetry} className="btn">
              Retry
            </button>
          </div>
        )}
      </div>
    )
  }
}
export default Projects
