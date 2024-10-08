import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'
import { apiRootPath } from '../conf/backendStatus';
import useCurrentAccount from '../services/CurrentAccountContext'
import LoadingPage from '../components/LoadingPage'

interface Article {
  id: number;
  title: string;
  url: string;
  sourceLogo: string;
  image: string;
}

async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${apiRootPath}/news`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
    throw error;
  }
}

const HandleNews: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editArticleId, setEditArticleId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newArticleUrl, setNewArticleUrl] = useState('');
  const [newLogoUrl, setNewLogoUrl] = useState('');
  const navigate = useNavigate();
  const { currentAccount } = useCurrentAccount()

  useEffect(() => {
    fetchArticles().then((fetchedArticles) => {
      setArticles(fetchedArticles);
    });
  }, []);

  const handleEdit = (article: Article) => {
    setShowAddPopup(true);
    setEditMode(true);
    setEditArticleId(article.id);
    setNewTitle(article.title);
    setNewImage(article.image);
    setNewArticleUrl(article.url);
    setNewLogoUrl(article.sourceLogo);
  };

  const saveArticle = () => {
    if (newTitle && newImage && newArticleUrl && newLogoUrl) {
      const updatedArticle: Article = {
        id: editArticleId !== null ? editArticleId : Date.now(),
        title: newTitle,
        image: newImage,
        url: newArticleUrl,
        sourceLogo: newLogoUrl,
      };

      let updatedArticles: Article[];
      if (editMode && editArticleId !== null) {
        updatedArticles = articles.map(article =>
          article.id === editArticleId ? updatedArticle : article
        );
        fetch(`${apiRootPath}/news`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedArticles),
        })
          .then(() => {
            console.log('Article modifié');
            setArticles(updatedArticles);
          })
          .catch(err => console.error(err));
      } else {
        updatedArticles = [...articles, updatedArticle];
        fetch(`${apiRootPath}/news`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedArticle),
        })
          .then(() => console.log('Article ajouté'))
          .catch(err => console.error(err));
      }
      setShowAddPopup(false);
      setEditMode(false);
      setEditArticleId(null);
      setNewTitle('');
      setNewImage('');
      setNewArticleUrl('');
      setNewLogoUrl('');
    }
  };

  console.log(JSON.stringify(articles, null, 2))

  useEffect(() => {
    if (currentAccount == null) {
      navigate('/login')
    }
  }, [currentAccount])

  if (currentAccount == null) {
    return <LoadingPage/>
  }
  return (
    <div style={{ padding: '20px' }}>
      <div>
        {articles.map((article) => (
          <div
            key={article.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '1px solid #ccc',
              paddingBottom: '10px',
            }}
          >
            <img
              src={article.image}
              alt={article.title}
              style={{ width: '150px', height: '100px', marginRight: '10px' }}
            />
            <div>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{article.title}</h2>
              <button onClick={() => handleEdit(article)}>Modifier</button>
            </div>
          </div>
        ))}
      </div>

      {showAddPopup && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          <input
            type={'text'}
            placeholder={'Titre'}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ display: 'block', marginBottom: '10px', width: '100%', border: '1px solid #ccc', padding: '8px' }}
          />
          <input
            type={'text'}
            placeholder={"URL de l'image"}
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            style={{ display: 'block', marginBottom: '10px', width: '100%', border: '1px solid #ccc', padding: '8px' }}
          />
          <input
            type={'text'}
            placeholder={"URL de l'article"}
            value={newArticleUrl}
            onChange={(e) => setNewArticleUrl(e.target.value)}
            style={{ display: 'block', marginBottom: '10px', width: '100%', border: '1px solid #ccc', padding: '8px' }}
          />
          <input
            type={'text'}
            placeholder={'URL du logo'}
            value={newLogoUrl}
            onChange={(e) => setNewLogoUrl(e.target.value)}
            style={{ display: 'block', marginBottom: '10px', width: '100%', border: '1px solid #ccc', padding: '8px' }}
          />
          <button onClick={saveArticle} style={{ marginRight: '10px' }}>
            {editMode ? 'Modifier' : 'Ajouter'}
          </button>
          <button onClick={() => setShowAddPopup(false)}>Annuler</button>
        </div>
      )}
    </div>
  );
};

export default HandleNews;
