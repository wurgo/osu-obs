import React from 'react';
import { InputComponent, TSlobsInputProps, useInput } from './inputs';
import InputWrapper from './InputWrapper';
import { Services } from '../../service-provider';
import { LinkOutlined, CloseOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Tooltip } from 'antd';
import css from './mediaUrlInput.m.less';
import { $t } from '../../../services/i18n';
import { promptAsync } from '../../modals';
import cx from 'classnames';

export const MediaUrlInput = InputComponent((p: TSlobsInputProps<{}, string>) => {
  const { wrapperAttrs, inputAttrs } = useInput('mediaurl', p);
  const value = inputAttrs.value;
  const isVideo = /\.webm/.test(inputAttrs.value);
  const isImage = !isVideo;

  return (
    <InputWrapper {...wrapperAttrs}>
      <div className={css.mediaInput}>
        {/* VIDEO PREVIEW */}
        {isVideo && (
          <div>
            <video loop muted autoPlay className={css.preview} key={value}>
              <source src={value} type="video/webm" />
            </video>
          </div>
        )}

        {/* IMAGE PREVIEW */}
        {isImage && <img src={value} className={css.preview} />}

        {/* CONTROL BUTTONS */}
        <MediaInputButtons value={inputAttrs.value} onChange={inputAttrs.onChange} />
      </div>
    </InputWrapper>
  );
});

export function MediaInputButtons(p: {
  value: string;
  onChange: (newVal: string) => unknown;
  isAudio?: boolean;
}) {
  async function pickFromGallery() {
    const file = await Services.MediaGalleryService.actions.return.pickFile({
      filter: p.isAudio ? 'audio' : 'image',
    });
    p.onChange(file.href);
  }

  async function showLink() {
    const newUrl = await promptAsync(
      {
        title: $t('Media URL'),
        placeholder: 'https://yoururl.com/image/Streamlabs',
      },
      p.value,
    );
    p.onChange(newUrl);
  }

  function remove() {
    p.onChange('');
  }

  const noFileText = p.isAudio ? $t('No Sound') : $t('No Media');
  const fileName = p.value ? p.value.split(/(\\|\/)/g).pop() : noFileText;
  const fileClassName = cx({ [css.filename]: true, [css.filenameEmpty]: !p.value });

  return (
    <Row className={css.mediaButtons} wrap={false}>
      <Col flex="auto" className={fileClassName}>
        {fileName}
      </Col>
      <Col flex="none">
        {p.value && (
          <Tooltip title={$t('Clear Link')}>
            <Button type="link" onClick={remove}>
              <CloseOutlined />
            </Button>
          </Tooltip>
        )}

        <Tooltip title={$t('Change Link')}>
          <Button type="link" onClick={showLink}>
            <LinkOutlined />
          </Button>
        </Tooltip>

        <Tooltip title={$t('Change Media')}>
          <Button type="link" onClick={pickFromGallery}>
            <CloudDownloadOutlined />
          </Button>
        </Tooltip>
      </Col>
    </Row>
  );
}
