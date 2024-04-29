import { Badge, Container, Image } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";

import { format, addHours } from "date-fns";

import styles from "./Post.module.css";
import { LinkContainer } from "react-router-bootstrap";
import { API_HOST_URL } from "../../constants/api";

export const Post = () => {
  const loaderData = useLoaderData();
  const author = loaderData.post.data.post?.author?.name;
  const imageUrl = loaderData.post.data.post.image?.filepath;
  const rawHtml = loaderData.post.data.post.content;
  const postCategories = loaderData.post?.data?.post?.categories;
  console.log(postCategories);

  const createdDate = format(
    addHours(new Date(loaderData.post.data.post.created_at), 1),
    "dd.MM.yyyy, HH:mm"
  );

  const updatedDate = format(
    addHours(new Date(loaderData.post.data.post.updated_at), 1),
    "dd.MM.yyyy, HH:mm"
  );

  console.log(loaderData);
  return (
    <>
      <div className={styles.hero}>
        <Container className="p-4">
          <div>
            <h1>{loaderData.post.data.post.title}</h1>
            <div>Autor: {author || "użytkownik usunięty"}</div>
            <div>
              Data dodania: {createdDate}
              {createdDate !== updatedDate && (
                <>, zaktualizowano: {updatedDate}</>
              )}
            </div>
          </div>
        </Container>
      </div>

      {imageUrl && (
        <Image
          className={styles.image}
          src={`${API_HOST_URL}/${imageUrl}`}
          fluid
        />
      )}

      <Container className="p-4">
        <div>
          <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
        </div>
      </Container>

      <Container className="p-4">
        {postCategories.length > 0 ? (
          <>
            <div className="mb-2">Kategorie: </div>

            <div className="d-flex gap-2 flex-wrap">
              {postCategories.map((category) => (
                <LinkContainer
                  key={category.id}
                  to={`/category/${category.id}`}
                  style={{ cursor: "pointer" }}
                >
                  <Badge
                    className="py-2"
                    bg="secondary"
                    title={category.description}
                  >
                    {category.name}
                  </Badge>
                </LinkContainer>
              ))}
            </div>
          </>
        ) : null}
      </Container>
    </>
  );
};
