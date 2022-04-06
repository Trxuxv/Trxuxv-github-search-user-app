import { Form, Card, Image, Icon } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [userInput, setUserInput] = useState('');
  const [avatar_url, setavatar] = useState('');
  const [userName, setUsername] = useState('');
  const [stars, setStarsdUrl] = useState('');
  const [repos, setRepos] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    fetch("https://api.github.com/users")
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
  }, [])

  const getStars = (userInput) => {
    fetch(`https://api.github.com/users/${userInput}/starred`)
      .then(res => res.json())
      .then(data => {
        setStarsdUrl(data.length)
      })
  }

  const setData = ({ name, login, followers, following, public_repos, avatar_url }) => {
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
        setData(data)
        getStars(userInput)
      })
  }

  return (
    <div className='body'>
      <div className='navbar'> <Icon name='github' /> Github Search</div>
      <div className='search'>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input placeholder='Type an username...' name='name' onChange={handleSearch} />
            <Form.Button content='Search' />
          </Form.Group>
        </Form>
      </div>
      {userName ? (<div> <div className='card'>
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
      </div></div>) : (<div className='no_one'> <p>Search for a user...</p></div>)
      }
      <div className='footer'>Débora Maciel <i>@2022</i></div>
    </div >
  )
}