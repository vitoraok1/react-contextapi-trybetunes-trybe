import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    loading: false,
    userName: '',
  };

  componentDidMount() {
    this.fetchUserName();
  }

  fetchUserName = async () => {
    this.setState({ loading: true });
    const responseName = await getUser();

    this.setState((previousState) => ({
      loading: !previousState.loading,
      userName: responseName.name,
    }));
  };

  render() {
    const { userName, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <header data-testid="header-component">
        <nav>
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">
                Pesquisar
              </Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">
                Favoritos
              </Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
        <h3 data-testid="header-user-name">
          { userName }
        </h3>
      </header>
    );
  }
}

export default Header;
