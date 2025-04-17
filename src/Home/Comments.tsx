import React from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loaderSelector } from "../common/loaderRedux/selectors";
import { PrimaryView } from "../common/components/PrimaryView/PrimaryView";
import { fetchCommentsByPostAction, fetchPostsAction } from "./redux/actions";
import { CommentType, storeType } from "../common/store/types";
import { Card, CurvedButton, Label, LoadingIndicator, Modal } from "../common/components";
import { moderateScale } from "react-native-size-matters";
import { theme } from "../common/theme";
import { useNavigation } from "@react-navigation/native";
import { Ripple } from "../common/components/Ripple/Ripple";
import PlusSVG from "../common/theme/icons/plus.svg"
import ElipsisSVG from "../common/theme/icons/elipsis.svg"
import IconCloseSVG from "../common/theme/icons/icon-close.svg"
import { strings } from "../common/i18n";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatListStyle: {
    paddingHorizontal: moderateScale(20)
  },
  postCardStyle: {
    padding: 0
  },
  cardStyle: {
    alignSelf: 'center',
    borderRadius: moderateScale(60),
    width: moderateScale(300),
    padding: 0,
    margin: 0,
    flexDirection: 'row',
    minHeight: moderateScale(60)
  },
  bodyStyle: {
    paddingVertical: moderateScale(10)
  },
  emptyImageView: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey'
  },
  nameStyle: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10)
  },
  headerRightStyle: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(60),
    right: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background.base,
    elevation: 2
  },
  elipsisStyle: {
    position: "absolute",
    right: 0,
    padding: moderateScale(5)
  },
  modalStyle: {
    backgroundColor: theme.colors.background.default,
    width: "100%",
    minHeight: moderateScale(200),
    borderRadius: moderateScale(15),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(30)
  },
  curvedButtonStyle: {
    marginTop: moderateScale(20),
    width: moderateScale(200),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButtonStyle: {
    position: "absolute",
    right: moderateScale(10),
    top: moderateScale(10),
    padding: moderateScale(15)
  },
  itemStyle: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(40)
  },
  highlightStyle: {
    backgroundColor: theme.colors.background.base,
    width: moderateScale(25),
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  highlightStyleLeft: {
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10)
  },
  highlightStyleRight: {
    borderTopRightRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    right: 0
  }
})

const Menu = ({ selectedComment, isVisible, onClose }: { selectedComment: CommentType | null, isVisible: boolean, onClose: () => void }) => {
  const navigation = useNavigation<any>()

  return (
    <Modal isVisible = {isVisible} onBackdropPress = {onClose}>
      <View style = {styles.modalStyle}>
        <Ripple
          testID = "close"
          accessibilityLabel = "close"
          style = {styles.closeButtonStyle}
          onPress = {onClose}
        >
          <IconCloseSVG width = {moderateScale(15)} height = {moderateScale(15)} />
        </Ripple>
        <CurvedButton
          testID = "editComment"
          accessibilityLabel = "editComment"
          buttonStyle = { { ...styles.curvedButtonStyle, backgroundColor: theme.colors.background.base } }
          title = {strings("editComment")}
          onPress = {() => {
            navigation.navigate(strings("Routes.addOrEditComment"), { comment: selectedComment })
            onClose()
          }}
        />

        <CurvedButton
          testID = "deleteComment"
          accessibilityLabel = "deleteComment"
          buttonStyle = { { ...styles.curvedButtonStyle, backgroundColor: theme.colors.font.danger } }
          title = {strings("deleteComment")}
          onPress = {onClose}
        />
      </View>
    </Modal>
  )
}

type AlphabetKey = keyof typeof theme.colors.alphabet

const EmptyImageView = ({ name = "" }: { name: string }) => {

  const backgroundColor = theme.colors.alphabet[name?.charAt(0)?.toUpperCase() as AlphabetKey]

  return (
    <View style = {[styles.emptyImageView, { backgroundColor }]}>
      <Label xxl white center title = {name?.charAt(0)?.toUpperCase() ?? ""} bold />
    </View>
  )
}

export const Comments = ({ route: { params } }: any) => {

  const navigation = useNavigation<any>()
  const dispatch = useDispatch()
  const { loading }:{ loading: boolean } = useSelector(loaderSelector("FetchComments"))
  const comments = useSelector((store: storeType) => store.home.comments[params.post.id])
  const [isVisible, setIsVisible] = React.useState(false)
  const [selectedComment, setSelectedComment] = React.useState<CommentType | null>(null)

  React.useEffect(() => {
    dispatch(fetchCommentsByPostAction({ postId: params.post.id }))
  }, [])

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Ripple style = {styles.headerRightStyle} onPress = {() => {
            navigation.navigate(strings("Routes.addOrEditComment"))
          }}>
            <PlusSVG width = {moderateScale(22)} height = {moderateScale(22)} />
          </Ripple>
        )
      }
    })
  }, [navigation])

  return (
    <PrimaryView>
      <View style = {styles.container}>
        <LoadingIndicator loading = {loading} />
        <FlatList
          stickyHeaderIndices = {[0]}
          ListHeaderComponent = {() => {
            return (
              <Card style = {styles.postCardStyle} disabled>
                <View style = {[styles.highlightStyle, styles.highlightStyleLeft]} />
                <View style = {[styles.highlightStyle, styles.highlightStyleRight]} />
                <View style = {styles.itemStyle}>
                  <Label center xl medium primary title = {params.post.title} numberOfLines = {2} ellipsizeMode = "tail" />
                  <Label center m title = {params.post.body.replaceAll("\n", " ")} style = {styles.bodyStyle} numberOfLines = {3} ellipsizeMode = "tail"/>
                </View>
              </Card>
            )
          }}
          refreshing = {false}
          refreshControl = {<RefreshControl
            refreshing = {false}
            onRefresh = {() => {
              dispatch(fetchPostsAction())
            }} />}
          style = {styles.flatListStyle}
          data = {comments ?? []}
          renderItem = {({ item: comment }: { item: CommentType }) => {
            return (
              <Card disabled>
                <Ripple style = {styles.elipsisStyle} onPress = {() => {
                  setSelectedComment(comment)
                  setIsVisible(true)
                }}>
                  <ElipsisSVG width = {moderateScale(22)} height = {moderateScale(22)} />
                </Ripple>
                <Card disabled style = {styles.cardStyle}>
                  <View style = { { marginLeft: moderateScale(5), justifyContent: 'center' } }>
                    <EmptyImageView name = {comment.email} />
                  </View>
                  <View style = {styles.nameStyle}>
                    <Label numberOfLines = {1} ellipsizeMode = "tail" center primary title = {comment.name} />
                    <Label center s secondary title = {comment.email} />
                  </View>
                </Card>
                <Label s title = {comment.body.replaceAll("\n", " ")} style = {styles.bodyStyle}/>
              </Card>
            )
          }}
        />
        <Menu
          selectedComment = {selectedComment}
          isVisible = {isVisible}
          onClose = {() => {
            setIsVisible(false)
            setSelectedComment(null)
          }} />
      </View>
    </PrimaryView>
  )
}
