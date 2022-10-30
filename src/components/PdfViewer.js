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
        // Those are safe to be exposed as they work only on the domains specified in PDFTron's dashboard
        licenseKey: window.location.host.includes('czerwoniakplus.pages.dev')
          ? 'NddW48Vf1XNr0JywBNGR'
          : '6wkqc5JwlbdXT1GJM02y',
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
