function switch_img(orig_img, new_img, new_alt) {
  if (!orig_img.dataset.original) {
    orig_img.dataset.original = orig_img.src;
    orig_img.dataset.originalAlt = orig_img.alt;
  }
  if (orig_img.src.includes(new_img)) {
    orig_img.src = orig_img.dataset.original;
    orig_img.alt = orig_img.dataset.originalAlt;
  } else {
    orig_img.src = new_img;
    orig_img.alt = new_alt;
  }
}
