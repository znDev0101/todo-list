import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link to="/" className="Todo-List">
          Todo List App
        </Link>
        <ul>
          <li>
            <Link to="/about">About App</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
