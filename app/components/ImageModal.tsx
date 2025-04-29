"use client"

import { memo, useState, useEffect, useCallback } from "react"
import { Box, Typography, Dialog, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Image from "next/image"
import { galleryImages } from "../utils/Gallery"
import OpenInFullIcon from "@mui/icons-material/OpenInFull"

const ModalNavButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  zIndex: 1,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
}))

const ModalImage = styled(Box)({
  position: "relative",
  width: "100%",
  height: "70vh",
})

const ImageModal = ({
  open,
  currentIndex: initialIndex,
  fullScreen,
  onClose,
}: any) => {
  const [currentIndex, setCurrentIndex] = useState<any>(initialIndex)
  const [isFullScreen, setIsFullScreen] = useState<any>(fullScreen)
  const totalImages = galleryImages.length

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const currentImage = galleryImages[currentIndex]

  const handlePrevImage = useCallback(() => {
    setCurrentIndex((prevIndex: number) => {
      return (prevIndex - 1 + totalImages) % totalImages
    })
  }, [totalImages])

  const handleNextImage = useCallback(() => {
    setCurrentIndex((prevIndex: number) => {
      return (prevIndex + 1) % totalImages
    })
  }, [totalImages])

  const handleKeyDown = useCallback(
    (event: { key: string }) => {
      if (event.key === "ArrowLeft") {
        handlePrevImage()
      } else if (event.key === "ArrowRight") {
        handleNextImage()
      } else if (event.key === "Escape") {
        onClose()
      }
    },
    [handlePrevImage, handleNextImage, onClose]
  )

  if (!currentImage) return null

  const onExpand = useCallback(() => {
    setIsFullScreen(!isFullScreen)
  }, [isFullScreen])

  return (
    <Dialog
      fullScreen={isFullScreen}
      maxWidth="lg"
      open={open}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      PaperProps={{
        sx: { overflowY: "hidden" },
      }}
    >
      <Box
        sx={{
          position: "relative",
          bgcolor: "background.paper",
          height: "100%",
          width: isFullScreen ? "100%" : "400px",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
            bgcolor: "rgba(0,0,0,0.5)",
            zIndex: 2,
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          aria-label="close"
          onClick={onExpand}
          sx={{
            position: "absolute",
            right: 6,
            top: 8,
            mr: 6,
            color: "white",
            bgcolor: "rgba(0,0,0,0.5)",
            zIndex: 2,
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
        >
          <OpenInFullIcon />
        </IconButton>

        <ModalNavButton
          onClick={handlePrevImage}
          sx={{
            left: 8,
            width: 48,
            height: 48,
          }}
          aria-label="Previous image"
        >
          <ArrowBackIcon fontSize="large" />
        </ModalNavButton>

        <ModalNavButton
          onClick={handleNextImage}
          sx={{
            right: 8,
            width: 48,
            height: 48,
          }}
          aria-label="Next image"
        >
          <ArrowForwardIcon fontSize="large" />
        </ModalNavButton>

        <ModalImage>
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="120vw"
            priority
            style={{ objectFit: "contain" }}
            quality={85}
          />
        </ModalImage>

        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" component="h3">
            {currentImage.alt}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kategorija: {currentImage.category}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {currentIndex + 1} / {totalImages}
          </Typography>
        </Box>
      </Box>
    </Dialog>
  )
}

export default memo(ImageModal)
