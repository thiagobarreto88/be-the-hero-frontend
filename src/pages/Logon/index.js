import React, { useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

export default function Login(){

    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await api.post('/login', { "login": id });

            console.log(response.data.ong.name);

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.ong.name);

            history.push("/profile");
        }catch(err){
            alert('Falha no login, tente novamente');
        }
    }

    const [id, setId] = useState('');

    return  (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleSubmit}>
                    <h1>Faça seu login</h1>
                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button"type="Submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}