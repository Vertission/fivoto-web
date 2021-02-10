import React, { useEffect, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { IconButton, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DragHandleIcon from '@material-ui/icons/DragHandle';

import { Context, dispatch } from '../../Context';

export default function DropZone({ maxFiles }) {
  const theme = useTheme();
  const classes = useStyles();

  const { photos, removePhotos } = useContext(Context);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({ accept: 'image/*' });

  const DragHandle = sortableHandle(() => (
    <DragHandleIcon fontSize='large' style={{ color: theme.palette.primary.main, cursor: 'pointer' }} />
  ));

  const removePhoto = (file, i) => {
    dispatch(
      'SET_PHOTOS',
      photos.filter((_, index) => index !== i)
    );
    if (file._id) {
      dispatch('SET_REMOVE_PHOTOS', [...removePhotos, file._id]);
    }
  };

  const SortableItem = sortableElement(({ source, file, i }) => (
    <div
      className={[classes.preview]}
      style={{ borderColor: i === 0 ? theme.palette.primary.dark : theme.palette.primary.light }}
    >
      <IconButton className={classes.dragHandler}>
        <DragHandle />
      </IconButton>
      <IconButton className={classes.closeButton} onClick={() => removePhoto(file, i)}>
        <CloseIcon style={{ color: theme.palette.error.main }} />
      </IconButton>
      <img className={classes.previewImage} src={source} alt={i} />
    </div>
  ));

  const SortableContainer = sortableContainer(({ children }) => {
    return <ul>{children}</ul>;
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    return dispatch('SET_PHOTOS', arrayMove(photos, oldIndex, newIndex));
  };

  useEffect(() => {
    dispatch(
      'SET_PHOTOS',
      [
        ...photos,
        acceptedFiles.map((file, i) => {
          return {
            preview: URL.createObjectURL(file),
            file,
          };
        }),
      ]
        .flat(Infinity)
        .slice(0, maxFiles)
    );
  }, [acceptedFiles]);

  return (
    <div className='dz'>
      <div {...getRootProps()} className='dz-drop'>
        {photos.length < maxFiles ? (
          <>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the photo here</p>
            ) : (
              <p>Drag and drop photos here, or click to select photos</p>
            )}{' '}
          </>
        ) : (
          <p>maximum up to {maxFiles} photos</p>
        )}
      </div>
      <Divider style={{ marginTop: 10 }} />
      <div className={classes.imgPreview}>
        <SortableContainer onSortEnd={onSortEnd} useDragHandle shouldUseDragHandle={true} axis='xy'>
          {photos.map((file, index) => (
            <SortableItem
              key={`item-${index}`}
              index={index}
              i={index}
              file={file}
              source={file.filename ? `/media/${file.filename}` : file.preview}
            />
          ))}
        </SortableContainer>
      </div>
      <style jsx>{`
        .dz {
          border: 3px dashed #c4c4c4;
          padding: 10px;
          text-align: center;
          color: #666;
          transition: all 0.7s;
          border-radius: 5px;
        }

        .dz:hover {
          border-color: ${theme.palette.primary.main};
        }

        .dz-drop {
          // padding: 20px 10px 15px 10px;
          transition: all 0.7s;
          border-radius: 3px;
          cursor: pointer;
        }

        .dz-drop:hover {
          background-color: rgb(245, 245, 245);
        }
      `}</style>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  imgPreview: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  preview: {
    width: '25%',
    height: '100px',
    position: 'relative',
    border: '2px solid',
    borderRadius: '3px',
    padding: '5px',
    margin: '10px',
    display: 'inline-block',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: '0%',
    right: '0%',
  },

  dragHandler: {
    position: 'absolute',
    top: '0%',
    left: '0%',
    cursor: 'grab',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    '&:active': {
      cursor: 'grabbing',
    },
  },
}));
