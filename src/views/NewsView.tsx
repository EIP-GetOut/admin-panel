import React, { useState } from 'react';

// Interface pour un article
interface Article {
  id: number;
  title: string;
  imageUrl: string;
  articleUrl: string;
  sourceLogo: string;
}

const handleNews: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newId, setNewId] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newArticleUrl, setNewArticleUrl] = useState('');
  const [newLogoUrl, setNewLogoUrl] = useState('');
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);

  // Ajouter un article
  const addArticle = () => {
    if (newTitle && newImageUrl && newArticleUrl) {
      const newArticle: Article = {
        id: newId,
        title: newTitle,
        imageUrl: newImageUrl,
        articleUrl: newArticleUrl,
        sourceLogo: newLogoUrl,
      };
      setArticles([...articles, newArticle]);
      setNewId(0);
      setNewTitle('');
      setNewImageUrl('');
      setNewArticleUrl('');
      setNewLogoUrl('');
      setShowAddPopup(false);
    }
  };

  // Supprimer un article après confirmation
  const confirmDelete = () => {
    if (articleToDelete !== null) {
      setArticles(articles.filter(article => article.id !== articleToDelete));
      setArticleToDelete(null);
    }
  };
  console.log(JSON.stringify(articles, null, 2))
  return (
    <div>
      {/* Liste des articles */}
      <div>
        {articles.map((article) => (
          <div
            key={article.id}
            style={{
              position: 'relative',
              border: '1px solid black',
              margin: '10px',
              padding: '10px',
              width: '500px',      // Limite la largeur à 500px
              height: '300px',      // Limite la hauteur à 300px
              overflow: 'hidden'    // Cache les débordements
            }}
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'   // Pour s'assurer que l'image s'adapte bien
              }}
            />
            <h2 style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '5px'
            }}>
              {article.title}
            </h2>
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px'
              }}
              onClick={() => setArticleToDelete(article.id)}
            >
              &#10005; {/* Croix pour suppression */}
            </button>
          </div>
        ))}
      </div>

      {/* Bouton pour ajouter un article */}
      <button
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
        onClick={() => setShowAddPopup(true)}>
        Ajouter un article
      </button>

      {showAddPopup && (
        <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
        }}>
          <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '5px',
      textAlign: 'center'
          }}>
            <h3>Ajouter un article</h3>
            <input
        type={'number'}
        placeholder={"ID de l'article"}
        value={newId}
        onChange={(e) => setNewId(parseInt(e.target.value))}
        style={{ margin: '10px', padding: '5px', width: '80%' }}
      />
            <input
        type={'text'}
        placeholder={"Titre de l'article"}
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        style={{ margin: '10px', padding: '5px', width: '80%' }}
      />
            <input
        type={'text'}
        placeholder={"URL de l'image"}
        value={newImageUrl}
        onChange={(e) => setNewImageUrl(e.target.value)}
        style={{ margin: '10px', padding: '5px', width: '80%' }}
      />
            <input
        type={'text'}
        placeholder={"URL de l'article"}
        value={newArticleUrl}
        onChange={(e) => setNewArticleUrl(e.target.value)}
        style={{ margin: '10px', padding: '5px', width: '80%' }}
      />
            <input
        type={'text'}
        placeholder={'URL du Logo'}
        value={newLogoUrl}
        onChange={(e) => setNewLogoUrl(e.target.value)}
        style={{ margin: '10px', padding: '5px', width: '80%' }}
      />

            {/* Le bouton "Ajouter" est maintenant centré sous le formulaire */}
            <div style={{ marginTop: '20px' }}>
              <button
          style={{
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            width: '100%', // Rendre le bouton plein
            marginBottom: '10px', // Espacement entre les boutons
          }}
          onClick={addArticle}>
                Ajouter
              </button>
              <button
          style={{
            padding: '10px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            width: '100%' // Rendre le bouton plein
          }}
          onClick={() => setShowAddPopup(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
)}


      {/* Pop-up de confirmation de suppression */}
      {articleToDelete !== null && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            <h3>Confirmer la suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer cet article ?</p>
            <button
              style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', marginRight: '10px' }}
              onClick={confirmDelete}>
              Oui
            </button>
            <button
              style={{ padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}
              onClick={() => setArticleToDelete(null)}>
              Non
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default handleNews;
