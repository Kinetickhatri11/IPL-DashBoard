// Write your code here
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import './index.css'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {
    isLoading: true,
    teamsData: [],
  }

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const apiUrl = 'https://apis.ccbp.in/ipl'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const teamsArray = data.teams
    const formattedData = teamsArray.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      teamImageURL: eachItem.team_image_url,
    }))
    console.log(formattedData)
    this.setState(() => ({isLoading: false, teamsData: formattedData}))
  }

  renderTeamsList = () => {
    const {teamsData} = this.state

    return (
      <ul className="teams-list">
        {teamsData.map(team => (
          <TeamCard teamDetails={team} key={team.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-route-container">
        <div className="teams-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}
export default Home
