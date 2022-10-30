import WebViewer from '@pdftron/pdfjs-express-viewer';
import React, {useRef, useEffect} from 'react';
import {StyleSheet} from 'react-native';

export const PdfViewer = props => {
  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: '/pdflib',
        initialDoc: props.url,
        licenseKey: window.location.host.includes('pages.dev')
          ? process.env.CLOUDFLARE_PDF_KEY
          : process.env.PDF_KEY,
      },
      viewer.current,
    ).then(instance => {
      // now you can access APIs through the WebViewer instance
      const {Core} = instance;

      // adding an event listener for when a document is loaded
      Core.documentViewer.addEventListener('documentLoaded', () => {
        console.log('document loaded');
      });

      // adding an event listener for when the page number has changed
      Core.documentViewer.addEventListener('pageNumberUpdated', pageNumber => {
        console.log(`Page number is: ${pageNumber}`);
      });
    });
  }, [props.url]);

  return <div style={styles.viewer} ref={viewer}></div>;
};

const styles = StyleSheet.create({
  viewer: {
    height: '100%',
    width: '100%',
  },
});
