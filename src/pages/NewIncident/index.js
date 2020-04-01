import React, { useState } from 'react';

import './styles.css';

import LogoImg from '../../assets/logo.svg';

import { Link, useHistory} from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

export default function NewIncident () {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [value, setValue] = useState();

    const ong_id = localStorage.getItem('ongId');

    const history = useHistory();

    async function createCase(e){

        e.preventDefault();
        
        const data = {
            title,
            description,
            value
        };
        
        try{
           await api.post('/incidents', data, {
               headers: {
                   Authorization: ong_id
               }
           });

           history.push('/profile');
        } catch (err){
            alert(err);
        }
        
        
        // {
            //headers: {
            //    Authorization: ong_id
            //},
            
        //});

        //api.delete(`/incidents/${id}`, {
        //    headers: {
        //        Authorization: ongId
        //    }
        //});

    }

    return (
        <div className="newincident-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be The Hero"/>
                    <h1>
                        Cadastrar novo caso
                    </h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />

                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)} />
                   
                    <button onClick={createCase} className="button" type="submit"> Cadastrar</button>
                </form>
            </div>
        </div>
    )
}