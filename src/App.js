import { Form, Card, Image, Icon } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import './App.css';


export default function App() {
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [userInput, setUserInput] = useState('');
  const [avatar_url, setavatar] = useState('');
  const [userName, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState('');
  const [name, setName] = useState('');
  const [stars, setStarsdUrl] = useState('');

  useEffect(() => {
    fetch("https://api.github.com/users/trxuxv")
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
  }, [])

  const getStars = (userInput) => {
    fetch(`https://api.github.com/users/${userInput}/starred`)
      .then(res => res.json())
      .then(data => {
        console.log("Count", data.length)
        setStarsdUrl(data.length)

      })
  }

  const setData = ({ name, login, followers, following, public_repos, avatar_url, starred_url }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setavatar(avatar_url);
  }

  const handleSearch = (e) => {
    setUserInput(e.target.value)
  }

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {

        getStars(userInput)
        console.log(stars(userInput))
        console.log("starts: ", data)

        if (data.message) {
          setError(data.message)
        } else {
          setData(data)
        }
      })
  }

  return (
    <div className='body'>
      <div className='navbar'> <Icon name='github' /> Github Search</div>
      <div className='search'>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input placeholder='username' name='name' onChange={handleSearch} />
            <Form.Button content='Search' />
          </Form.Group>
        </Form>
      </div>
      {error ? (<h1>{error}</h1>) : (
        <div className='card'>
          <Card color='black'>
            <Image color='black' src={avatar_url} wrapped ui={false} />
            <Card.Content color='black'>
              <Card.Header color='black'>{name}</Card.Header>
              <p className='username' >{userName}</p>
            </Card.Content>
            <Card.Content extra>
              <a className='ml'>
                <Icon name='users' />
                {followers} followers
              </a>
              <a className='ml'>
                <Icon name='user' />
                {following} following
              </a>
            </Card.Content>
            <Card.Content extra>
              <a className='ml'>
                <Icon name='folder open' />
                {repos} repositories
              </a>
              <a className='ml-st'>
                <Icon name='star outline' />
                {stars} stars
              </a>
            </Card.Content>
          </Card>
        </div>
      )}
      <div className='footer'>Débora Maciel <i>@2022</i></div>
    </div >
  )
}