import React, { useEffect, useState } from 'react';
import { Form, Card, Image, Icon } from 'semantic-ui-react';
import './App.css';


function App() {
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar_url, setavatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
  }, [])

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
        if (data.message) {
          setError(data.message)
        } else {
          setData(data)
        }
      })
  }

  return (
    <div className='body'>
      <div className='navbar'>Github Search</div>
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
              <Card.Meta>
                <span className='date'>Joined in 2015</span>
              </Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {followers} followers
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {repos} repositories
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {following} following
              </a>
            </Card.Content>
          </Card>
        </div>
      )}
      <div className='footer'>Débora Maciel <i>@2022</i></div>
    </div >
  )
}

export default App;
