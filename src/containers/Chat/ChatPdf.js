import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';
import React from 'react';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F5F6FA',
  },
  headerItem: {
    flexGrow: 1,
  },
  headerTitle: {
    color: '#6F697E',
    fontSize: 10.5,
    marginBottom: 6,
  },
  headerValue: {
    color: '#2E2D30',
    fontSize: 12,
  },
  headerValueTicket: {
    color: '#007AFF',
    fontSize: 12,
  },
  chatDate: {
    color: '#2f2b34',
    textAlign: 'center',
    fontSize: 9,
    marginBottom: 12,
  },
  chatAdmin: {
    fontSize: 10.5,
    color: 'white',
    backgroundColor: '#007AFF',
    padding: 8,
    marginBottom: 8,
    width: '40%',
    borderRadius: 8,
  },
  chatUser: {
    fontSize: 10.5,
    backgroundColor: 'white',
    color: '#2E2D30',
    padding: 8,
    marginBottom: 8,
    width: '40%',
    textAlign: 'right',
    marginLeft: '60%',
    borderRadius: 8,
    border: '1px solid #E1E2EA',
  },
});

export const ChatPdf = ({ chatStatus }) => {
  const log = chatStatus?.data?.log;
  const history = chatStatus?.data?.history;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ padding: 16, flexDirection: 'row', backgroundColor: 'white' }}>
          <View style={styles.headerItem}>
            <Text style={styles.headerTitle}>Ticket ID</Text>
            <Text style={styles.headerValueTicket}>{log.ticketId?.ticketId}</Text>
          </View>
          <View style={styles.headerItem}>
            <Text style={styles.headerTitle}>Chat by</Text>
            <Text style={styles.headerValue}>{log.name}</Text>
          </View>
          <View style={styles.headerItem}>
            <Text style={styles.headerTitle}>Admin CS</Text>
            <Text style={styles.headerValue}>{log.customerServiceName}</Text>
          </View>
        </View>
        <View style={{ padding: 12 }}>
          {history.map((message, index) => {
            const prevMessageDate = index === 0 ? '' : moment(history[index - 1].sentAt).format('D MMM YYYY');
            const messageDate = moment(message.sentAt).format('D MMM YYYY');
            const messageTime = moment(message.sentAt).format('HH:mm');

            return (
              <View key={message._id}>
                {prevMessageDate !== messageDate && <Text style={styles.chatDate}>{messageDate}</Text>}
                {message.isSentByAdmin && (
                  <View style={styles.chatAdmin}>
                    <Text style={{ marginBottom: 4 }}>{log.customerServiceName}</Text>
                    {message.attachment.length ? (
                      message.attachment.map((item) => <Text style={{ marginBottom: 4 }}>{item.name}</Text>)
                    ) : (
                      <Text style={{ marginBottom: 4 }}>{message.message}</Text>
                    )}
                    <Text>{messageTime}</Text>
                  </View>
                )}
                {message.isSentByUser && (
                  <View style={styles.chatUser}>
                    <Text style={{ marginBottom: 4 }}>{log.name}</Text>
                    {message.attachment.length ? (
                      message.attachment.map((item) => <Text style={{ marginBottom: 4 }}>{item.name}</Text>)
                    ) : (
                      <Text style={{ marginBottom: 4 }}>{message.message}</Text>
                    )}
                    <Text>{messageTime}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default ChatPdf;
