/** @jsxImportSource @emotion/react */
import ReactModal from "react-modal";
import * as s from "./styles";
import { useEffect, useRef, useState } from "react";
import { useMeQuery } from "../../queries/usersQueries";
import Loading from "../common/Loading";
import Select from "react-select";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { imageListBox } from "./styles";
import { createPost } from "../../apis/posts/postsApi";
import { useCreatePostMutation } from "../../mutations/postMutations";
ReactModal.setAppElement("#root");

function AddPostModal({ isOpen, onRequestClose, layoutRef, setHomeRefresh }) {
  const [visibilityOption, setVisibilityOption] = useState({
    label: "Public",
    value: "Public",
  }); // 옵션 객체로
  const [textareavalue, setTextareaValue] = useState("");
  const [uploadImages, setUploadImages] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const imageListBoxRef = useRef();
  const { isLoading, data } = useMeQuery();
  // const { image, setImage } = useState([]);
  const createPostMutation = useCreatePostMutation();

  //비어있을 때 disabled 활성화
  useEffect(() => {
    setDisabled(!textareavalue && !uploadImages.length);
  }, [textareavalue, uploadImages]);

  const handleOnWheel = (e) => {
    imageListBoxRef.current.scrollLeft += e.deltaY;
  };

  const handleFileLoadOnClick = () => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", "image/*");
    fileInput.setAttribute("multiple", "true");
    fileInput.click();

    fileInput.onchange = (e) => {
      const { files } = e.target;
      const fileArray = Array.from(files);

      const readFile = (file) =>
        new Promise((resolve) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = (e) => {
            resolve({
              file,
              dataURL: e.target.result,
            });
          };
        });

      Promise.all(fileArray.map((file) => readFile(file))).then((result) => {
        setUploadImages([...uploadImages, ...result]);
      });
      //파일 객체를 프로미스 객체로 바꿔서 넣은 것
      //result - 프로미스 객체들 then 실행된 결과
    };
  };

  // 이미지 삭제
  // const handleImageDeleteOnClick = (index) => {
  //   console.log(index);
  //   setImage(uploadImages.filter((key, i) => i !== index));
  // };

  const handleImageDeleteOnClick = (index) => {
    const deletedImages = uploadImages.filter(
      (img, imgIndex) => imgIndex !== index
    );
    setUploadImages(deletedImages);
  };

  const handlePostSubmitOnClick = async () => {
    const formData = new FormData();
    formData.append("visibility", visibilityOption.value);
    formData.append("content", textareavalue);
    for (let img of uploadImages) {
      formData.append("files", img.file);
    }
    try {
      createPostMutation.mutateAsync(formData);
      alert("작성 완료");
      setHomeRefresh(true);
      onRequestClose();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ReactModal
      style={{
        overlay: {
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000000",
        },
        content: {
          position: "static",
          boxShadow: "0 0 10px 5px #00000033",
          padding: "0",
        },
      }}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      parentSelector={() => layoutRef.current}
      appElement={layoutRef.current}
      ariaHideApp={false}
    >
      {createPostMutation.isPending && <Loading />}
      <div css={s.modalLayout}>
        <header>
          <h2>Add a Post</h2>
        </header>
        <main>
          <div css={s.profileContainer}>
            <div css={s.profileImg(data.data.imgUrl)}></div>
            <div>{data.data.nickname}</div>
          </div>
          <Select
            options={[
              {
                label: "Public",
                value: "Public",
              },
              {
                label: "Follow",
                value: "Follow",
              },
            ]}
            value={visibilityOption}
            onchange={(option) => console.log(option)}
            // public, follow 저 옵션 자체를 가져오는 것
          />
          <div css={s.contentInputBox}>
            <textarea
              value={textareavalue}
              onChange={(e) => setTextareaValue(e.target.value)}
            ></textarea>
          </div>
          <div css={s.uploadBox} onClick={handleFileLoadOnClick}>
            <IoCloudUploadOutline />
            <div>Please post your story.</div>
            <button>Add Image</button>
          </div>
          <div
            css={s.imageListBox}
            ref={imageListBoxRef}
            onWheel={handleOnWheel}
          >
            {uploadImages.map((img, index) => (
              <div css={s.preview(img.dataURL)} key={index}>
                <div onClick={() => handleImageDeleteOnClick(index)}>
                  <IoIosClose />
                </div>
              </div>
            ))}
          </div>
        </main>
        <footer>
          <button
            css={s.postButton}
            onClick={handlePostSubmitOnClick}
            disabled={disabled}
          >
            Post
          </button>
          <button onClick={onRequestClose}>Cancel</button>
        </footer>
      </div>
    </ReactModal>
  );
}
export default AddPostModal;
