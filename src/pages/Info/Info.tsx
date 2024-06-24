import React, { useState } from 'react';
import { IonContent, IonHeader, IonTitle,IonSegment, IonSegmentButton, IonButton, IonIcon} from '@ionic/react';
import {  book, } from 'ionicons/icons';
import bloco1 from '../../assets/imgs/Book Club Inicio.png'
import bloco2 from '../../assets/imgs/celInfo.gif'
import bloco3 from '../../assets/imgs/livrosInfo.gif'
import '../../style.css'


const Info: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('heart1');

  const onSegmentChange = (value: string) => {
    setSelectedSegment(value);
  };

  return (
    <IonContent fullscreen id="container" className='bg-tom-tomRoxoEscuro '>
      <div className='bg-tom-tomRoxoEscuro '>
        <div id="bloco1" style={{ display: selectedSegment === 'heart1' ? 'block' : 'none' }} className='bg-tom-tomRoxoEscuro  '><br />
        
          <IonTitle size='small' className="text-white text-xl text-center flex justify-center flex-wrap "><span className="text-tom-tomRosaEscuro text-2xl "  >Registre</span> os livros que você lê.</IonTitle><br />
          <img src={bloco1} className="img" alt="Descrição da Imagem" /><br />
        </div>
        <div id="bloco2" style={{ display: selectedSegment === 'heart2' ? 'block' : 'none' }}className='bg-tom-tomRoxoEscuro p-5'><br />
          <IonTitle size='small' className="text-white text-xl text-center flex justify-center flex-wrap "><span className="text-tom-tomRosaEscuro text-2xl " >Descubra</span> novos universos literários.</IonTitle><br />
          <img src={bloco2} className="img" alt="Descrição da Imagem" /><br />
        </div>
        <div id="bloco3" style={{ display: selectedSegment === 'heart3' ? 'block' : 'none' }}className='bg-tom-tomRoxoEscuro p-5'><br />
          <IonTitle size='small' className="text-white text-xl text-center flex justify-center flex-wrap "><span className="text-tom-tomRosaEscuro text-2xl  " >Organize</span> todos os livros que você já leu.</IonTitle><br />
          <img src={bloco3} className="img" alt="Descrição da Imagem" /><br />
        </div>
      </div>
      <div id="bloco4">
        <IonSegment scrollable onIonChange={e => onSegmentChange(e.detail.value!.toString())}>
        <IonSegmentButton  color="tertiary" value="heart1">
          <IonIcon aria-hidden="true" icon={book} />
        </IonSegmentButton>
        <IonSegmentButton  color="tertiary" value="heart2">
          <IonIcon aria-hidden="true" icon={book} />
        </IonSegmentButton>
        <IonSegmentButton  color="tertiary" value="heart3">
          <IonIcon aria-hidden="true" icon={book} />
        </IonSegmentButton>
        </IonSegment>
        <br />
        <IonButton id="btn" color="tertiary" routerLink="/login" className="flex justify-center m-2 text-white font-bold rounded">Login</IonButton>
      </div>
    </IonContent>
  );
};


export default Info;


